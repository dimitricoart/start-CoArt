import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery, FindOneOptions, Loaded, QueryFlag, raw } from "@mikro-orm/core";

import { IPaginationDto } from "@framework/types";
import { IOfferCreateDto, OfferStatus } from "@framework/types";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { OfferEntity } from "./offer.entity";
import { AssetService } from "../asset/asset.service";
import { LedgerService } from "../ledger/ledger.service";

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerEntityRepository: EntityRepository<OfferEntity>,
    private readonly assetService: AssetService,
    private readonly ledgerService: LedgerService,
  ) {}

  private toBigInt(value: string | number | bigint): bigint {
    return typeof value === "bigint" ? value : BigInt(value);
  }

  public search(dto: IPaginationDto, userEntity: UserEntity): Promise<[Array<OfferEntity>, number]> {
    const { skip, take } = dto;

    const where: FilterQuery<OfferEntity> = {
      merchant: userEntity.merchant,
    };

    return this.offerEntityRepository.findAndCount(where, {
      offset: skip,
      limit: take,
      flags: [QueryFlag.PAGINATE],
    });
  }

  public count(where: FilterQuery<OfferEntity>): Promise<number> {
    return this.offerEntityRepository.count(where);
  }

  public async create(dto: IOfferCreateDto, userEntity: UserEntity): Promise<OfferEntity> {
    const { assetId, price } = dto;
    const fractions = this.toBigInt(dto.fractions);

    const assetEntity = await this.assetService.findOneAndCheckExistence({ id: assetId });

    const count = await this.count({
      asset: assetEntity,
      merchant: userEntity.merchant,
      offerStatus: OfferStatus.AVAILABLE,
    });

    if (count) {
      throw new ConflictException("onlyOneOfferAllowed");
    }

    const ledgerEntity = await this.ledgerService.findOne({
      merchant: userEntity.merchant,
      asset: assetEntity,
    });

    if (!ledgerEntity || ledgerEntity.fractions < fractions) {
      throw new ForbiddenException("insufficientBalance");
    }

    await this.ledgerService.update(
      { id: ledgerEntity.id },
      {
        fractions: ledgerEntity.fractions - fractions,
      },
    );

    const offerEntity = this.offerEntityRepository.create({
      price,
      fractions,
      asset: assetEntity,
      merchant: userEntity.merchant,
      offerStatus: OfferStatus.AVAILABLE,
    });

    await this.offerEntityRepository.getEntityManager().persist(offerEntity).flush();

    return offerEntity;
  }

  public findOne<Hint extends string = never>(
    where: FilterQuery<OfferEntity>,
    options?: FindOneOptions<OfferEntity, Hint>,
  ): Promise<Loaded<OfferEntity, Hint> | null> {
    return this.offerEntityRepository.findOne(where, options);
  }

  public async findOneAndCheckExistence<Hint extends string = never>(
    where: FilterQuery<OfferEntity>,
    options?: FindOneOptions<OfferEntity, Hint>,
  ): Promise<Loaded<OfferEntity, Hint>> {
    const assetEntity = await this.findOne(where, options);

    if (!assetEntity) {
      throw new NotFoundException("offerNotFound");
    }

    return assetEntity;
  }

  public async update(where: FilterQuery<OfferEntity>, dto: Partial<OfferEntity>): Promise<OfferEntity> {
    const offerEntity = await this.findOneAndCheckExistence(where);
    Object.assign(offerEntity, dto);
    await this.offerEntityRepository.getEntityManager().persist(offerEntity).flush();
    return offerEntity;
  }

  public async delete(offerId: string, userEntity: UserEntity): Promise<void> {
    const offerEntity = await this.findOneAndCheckExistence({ id: offerId, merchant: userEntity.merchant });

    if (offerEntity.offerStatus !== OfferStatus.AVAILABLE) {
      throw new BadRequestException("forbiddenTransition");
    }

    Object.assign(offerEntity, { offerStatus: OfferStatus.DELETED });
    await this.offerEntityRepository.getEntityManager().persist(offerEntity).flush();

    await this.ledgerService.update(
      { asset: offerEntity.asset, merchant: userEntity.merchant },
      {
        fractions: raw("fractions - ?", [offerEntity.fractions]),
      },
    );
  }
}
