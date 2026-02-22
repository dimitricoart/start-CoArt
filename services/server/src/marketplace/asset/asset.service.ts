import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery, FindOneOptions, FindOptions, Loaded, QBFilterQuery, QueryFlag } from "@mikro-orm/core";

import {
  AssetStatus,
  IAssetCreateDto,
  IAssetSearchDto,
  IAssetTokenizeDto,
  IAssetUpdateDto,
  IAssetValidateDto,
  MerchantStatus,
  TypesenseCollections,
} from "@framework/types";
import { DEFAULT_AMOUNT_OF_FRACTIONS_IN_ASSET } from "@framework/constants";
import { getMarkdown } from "../../utils/lexical";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { EmailType } from "../../infrastructure/email/interfaces";
import { EmailService } from "../../infrastructure/email/email.service";
import { assetSchema } from "../../integrations/typesense/schemas/asset.schema";
import { TypesenseService } from "../../integrations/typesense/typesense.service";
import { ArweaveService } from "../../integrations/arweave/arweave.service";
import { TokenService } from "../../blockchain/hierarchy/token/token.service";
import { PhotoService } from "../photo/photo.service";
import { DocumentService } from "../document/document.service";
import { PdfService } from "../pdf/pdf.service";
import { AssetEntity } from "./asset.entity";
import type { IAssetProposePriceDto } from "./interfaces";
import { LedgerService } from "../ledger/ledger.service";
import { ShowroomService } from "../showroom/showroom.service";

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assetEntityRepository: EntityRepository<AssetEntity>,
    private readonly ledgerService: LedgerService,
    private readonly photoService: PhotoService,
    private readonly documentService: DocumentService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly pdfService: PdfService,
    private readonly arweaveService: ArweaveService,
    private readonly typesenseService: TypesenseService,
    private readonly showroomService: ShowroomService,
  ) {}

  public search(dto: IAssetSearchDto, userEntity: UserEntity): Promise<[Array<AssetEntity>, number]> {
    const { skip, take, assetStatus } = dto;

    const where: FilterQuery<AssetEntity> = {
      merchant: userEntity.merchant,
    };

    if (assetStatus && assetStatus.length > 0) {
      where.assetStatus = { $in: assetStatus };
    }

    return this.assetEntityRepository.findAndCount(where, {
      offset: skip,
      limit: take,
      flags: [QueryFlag.PAGINATE],
    });
  }

  public findAll<Hint extends string = never>(
    where: FilterQuery<AssetEntity>,
    options?: FindOptions<AssetEntity, Hint>,
  ): Promise<Array<AssetEntity>> {
    return this.assetEntityRepository.findAll({ ...options, where });
  }

  public new(where: QBFilterQuery<AssetEntity>): Promise<[Array<AssetEntity>, number]> {
    return this.assetEntityRepository.findAndCount(
      {
        ...where,
        assetStatus: AssetStatus.NEW,
      },
      { populate: ["merchant"] },
    );
  }

  public async create(dto: IAssetCreateDto, userEntity: UserEntity): Promise<AssetEntity> {
    const { photos, documents, dimensions, ...rest } = dto;

    const assetEntity = this.assetEntityRepository.create({
      ...rest,
      dimensions,
      merchant: userEntity.merchant,
      assetStatus: AssetStatus.NEW,
      fractions: DEFAULT_AMOUNT_OF_FRACTIONS_IN_ASSET,
    });

    await this.assetEntityRepository.getEntityManager().persist(assetEntity).flush();

    await this.photoService.update(assetEntity, photos);
    await this.documentService.update(assetEntity, documents);

    return assetEntity;
  }

  public async update(
    where: FilterQuery<AssetEntity>,
    dto: Partial<IAssetUpdateDto>,
    userEntity: UserEntity,
  ): Promise<AssetEntity> {
    const { photos, documents, ...rest } = dto;

    const assetEntity = await this.findOneAndCheckOwner(
      where,
      { populate: ["merchant", "photos", "documents"] },
      userEntity,
    );

    if ([AssetStatus.FINALIZED, AssetStatus.REJECTED].includes(assetEntity.assetStatus)) {
      throw new BadRequestException("forbiddenTransition");
    }

    // update if not undefined
    if (photos) {
      await this.photoService.update(assetEntity, photos);
    }

    // update if not undefined
    if (documents) {
      await this.documentService.update(assetEntity, documents);
    }

    Object.assign(assetEntity, {
      ...rest,
      assetStatus: AssetStatus.NEW,
    });

    await this.assetEntityRepository.getEntityManager().persist(assetEntity).flush();
    return assetEntity;
  }

  public async tokenize(
    where: FilterQuery<AssetEntity>,
    dto: IAssetTokenizeDto,
    userEntity: UserEntity,
  ): Promise<void> {
    const assetEntity = await this.findOneAndCheckOwner(
      where,
      { populate: ["documents", "merchant", "merchant.wallet"] },
      userEntity,
    );

    if (assetEntity.assetStatus !== AssetStatus.APPROVED) {
      throw new BadRequestException("forbiddenTransition");
    }

    const { id } = await this.arweaveService.uploadAsset(assetEntity);

    const tokenEntity = await this.tokenService.create(assetEntity, DEFAULT_AMOUNT_OF_FRACTIONS_IN_ASSET, id);

    const showroomEntity = await this.showroomService.findOneAndCheckExistence({
      merchant: userEntity.merchant,
      isDefault: true,
    });

    await this.ledgerService.create(
      userEntity.merchant,
      showroomEntity,
      assetEntity,
      DEFAULT_AMOUNT_OF_FRACTIONS_IN_ASSET,
    );

    const agreementUrl = await this.pdfService.generateListingAgreement(assetEntity, dto, id);

    Object.assign(assetEntity, {
      agreementUrl,
      token: tokenEntity,
      assetStatus: AssetStatus.FINALIZED,
      seller: dto.name,
      arUrl: `ar://${id}`,
    });

    await this.assetEntityRepository.getEntityManager().persist(assetEntity).flush();

    await this.emailService.sendEmail(EmailType.LISTING_AGREEMENT, {
      agreementUrl,
      seller: userEntity.merchant,
    });

    await this.typesenseService.upsertDocument(
      {
        id: assetEntity.id,
        userId: assetEntity.merchant?.id,
        title: assetEntity.title,
        description: getMarkdown(assetEntity.description),
        assetStatus: assetEntity.assetStatus,
        imageUrl: assetEntity.imageUrl,
      },
      TypesenseCollections.ASSETS,
    );
  }

  public async validate(where: FilterQuery<AssetEntity>, dto: Partial<IAssetValidateDto>): Promise<AssetEntity> {
    const { assetStatus, comment } = dto;
    const assetEntity = await this.findOneAndCheckExistence(where);

    Object.assign(assetEntity, {
      assetStatus: assetStatus,
      comment: assetStatus === AssetStatus.APPROVED ? null : comment,
    });

    await this.assetEntityRepository.getEntityManager().persist(assetEntity).flush();
    return assetEntity;
  }

  public async propose(
    where: FilterQuery<AssetEntity>,
    dto: Partial<IAssetProposePriceDto>,
    userEntity: UserEntity,
  ): Promise<void> {
    const assetEntity = await this.findOneAndCheckExistence(where, { populate: ["merchant"] });

    await this.emailService.sendEmail(EmailType.PROPOSE_YOUR_PRICE, {
      message: dto.message,
      replyTo: dto.email,
      seller: assetEntity.merchant,
      buyer: userEntity.merchant,
    });
  }

  public async findOneWithRelations(
    where: QBFilterQuery<AssetEntity>,
    userEntity?: UserEntity,
  ): Promise<AssetEntity | null> {
    if (userEntity) {
      return this.assetEntityRepository.findOne(where, {
        populate: ["merchant", "provenance", "photos", "documents", "favorites", "offers"],
        populateWhere: {
          favorites: {
            user: userEntity.id,
          },
        },
        orderBy: {
          photos: {
            priority: "ASC",
          },
        },
      });
    } else {
      return this.assetEntityRepository.findOne(where, {
        populate: ["merchant", "photos", "documents"],
        orderBy: {
          photos: {
            priority: "ASC",
          },
        },
      });
    }
  }

  public findOne<Hint extends string = never>(
    where: FilterQuery<AssetEntity>,
    options?: FindOneOptions<AssetEntity, Hint>,
  ): Promise<Loaded<AssetEntity, Hint> | null> {
    return this.assetEntityRepository.findOne(where, options);
  }

  public async findOneAndCheckExistence<Hint extends string = never>(
    where: FilterQuery<AssetEntity>,
    options?: FindOneOptions<AssetEntity, Hint>,
  ): Promise<Loaded<AssetEntity, Hint>> {
    const assetEntity = await this.findOne(where, options);

    if (!assetEntity) {
      throw new NotFoundException("assetNotFound");
    }

    return assetEntity;
  }

  public async findOneAndCheckOwner<Hint extends string = never>(
    where: FilterQuery<AssetEntity>,
    options: FindOneOptions<AssetEntity, Hint>,
    userEntity: UserEntity,
  ): Promise<Loaded<AssetEntity, Hint>> {
    const assetEntity = await this.findOneAndCheckExistence(where, options);

    if (assetEntity.merchant?.id !== userEntity.merchant?.id) {
      throw new ForbiddenException("insufficientPermissions");
    }

    return assetEntity;
  }

  public async findOneAndCheckStatus(where: QBFilterQuery<AssetEntity>, userEntity?: UserEntity): Promise<AssetEntity> {
    const assetEntity = await this.findOneWithRelations(where, userEntity);

    if (!assetEntity) {
      throw new NotFoundException("assetNotFound");
    }

    if (assetEntity.merchant?.merchantStatus !== MerchantStatus.ACTIVE) {
      throw new NotFoundException("assetNotFound");
    }

    if (assetEntity.merchant?.id !== userEntity?.merchant?.id) {
      if (assetEntity.assetStatus !== AssetStatus.FINALIZED) {
        throw new NotFoundException("assetNotFound");
      }
    }

    return assetEntity;
  }

  public async delete(where: FilterQuery<AssetEntity>, userEntity: UserEntity): Promise<AssetEntity> {
    const assetEntity = await this.findOneAndCheckOwner(where, { populate: ["merchant"] }, userEntity);

    if (!assetEntity) {
      throw new NotFoundException("assetNotFound");
    }

    if (assetEntity.merchant?.id !== userEntity.merchant?.id) {
      throw new ForbiddenException("insufficientPermissions");
    }

    await this.assetEntityRepository.getEntityManager().remove(assetEntity).flush();

    await this.typesenseService.deleteDocument(assetEntity.id, TypesenseCollections.ASSETS);

    return assetEntity;
  }

  public async sync(): Promise<{ count: number }> {
    await this.typesenseService.deleteCollection(TypesenseCollections.ASSETS);
    await this.typesenseService.createCollection(assetSchema);

    const assetEntities = await this.findAll({ assetStatus: AssetStatus.FINALIZED }, { populate: ["merchant"] });

    for (const assetEntity of assetEntities) {
      await this.typesenseService.upsertDocument(
        {
          id: assetEntity.id,
          userId: assetEntity.merchant?.id,
          title: assetEntity.title,
          description: getMarkdown(assetEntity.description),
          assetStatus: assetEntity.assetStatus,
          imageUrl: assetEntity.imageUrl,
        },
        TypesenseCollections.ASSETS,
      );
    }

    return { count: assetEntities.length };
  }
}
