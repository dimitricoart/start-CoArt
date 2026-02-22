import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery, FindAllOptions, FindOneOptions, Loaded, QueryFlag } from "@mikro-orm/core";

import { AssetStatus, ILedgerSearchDto } from "@framework/types";

import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { ShowroomService } from "../showroom/showroom.service";
import { AssetEntity } from "../asset/asset.entity";
import { LedgerEntity } from "./ledger.entity";
import { ShowroomEntity } from "../showroom/showroom.entity";
import { UserEntity } from "../../infrastructure/user/user.entity";
import { ILedgerAutocompleteResult } from "./interfaces";

@Injectable()
export class LedgerService {
  constructor(
    @InjectRepository(LedgerEntity)
    private readonly ledgerEntityEntityRepository: EntityRepository<LedgerEntity>,
    private readonly showroomService: ShowroomService,
  ) {}

  public search(dto: ILedgerSearchDto): Promise<[Array<LedgerEntity>, number]> {
    const { skip, take, showroomId, merchantId } = dto;

    const queryBuilder = this.ledgerEntityEntityRepository.createQueryBuilder("ledger");

    queryBuilder.innerJoinAndSelect("ledger.asset", "asset", { assetStatus: AssetStatus.FINALIZED });

    queryBuilder.andWhere({
      fractions: { $gt: 0 },
    });

    if (showroomId) {
      queryBuilder.andWhere({
        showroom: showroomId,
      });
    }

    if (merchantId) {
      queryBuilder.andWhere({
        merchant: merchantId,
      });
    }

    queryBuilder.orderBy({
      merchant: {
        priority: "DESC",
      },
    });
    queryBuilder.offset(skip);
    queryBuilder.limit(take);
    queryBuilder.setFlag(QueryFlag.PAGINATE);

    return queryBuilder.getResultAndCount();
  }

  public async create(
    merchantEntity: MerchantEntity,
    showroomEntity: ShowroomEntity,
    assetEntity: AssetEntity,
    fractions: bigint,
  ): Promise<LedgerEntity> {
    const ledgerEntity = this.ledgerEntityEntityRepository.create({
      merchant: merchantEntity,
      showroom: showroomEntity,
      asset: assetEntity,
      fractions,
    });

    await this.ledgerEntityEntityRepository.getEntityManager().persist(ledgerEntity).flush();

    return ledgerEntity;
  }

  public findOne<Hint extends string = never>(
    where: FilterQuery<LedgerEntity>,
    options?: FindOneOptions<LedgerEntity, Hint>,
  ): Promise<Loaded<LedgerEntity, Hint> | null> {
    return this.ledgerEntityEntityRepository.findOne(where, options);
  }

  public findOneWithRelations(where: FilterQuery<LedgerEntity>): Promise<LedgerEntity | null> {
    return this.ledgerEntityEntityRepository.findOne(where, { populate: ["asset", "asset.merchant", "asset.photos"] });
  }

  public async findOneAndCheckExistence<Hint extends string = never>(
    where: FilterQuery<LedgerEntity>,
    options?: FindOneOptions<LedgerEntity, Hint>,
  ): Promise<Loaded<LedgerEntity, Hint>> {
    const ledgerEntity = await this.findOne(where, options);

    if (!ledgerEntity) {
      throw new NotFoundException("balanceNotFound");
    }

    return ledgerEntity;
  }

  public async update(where: FilterQuery<LedgerEntity>, dto: Partial<LedgerEntity>): Promise<LedgerEntity> {
    const ledgerEntity = await this.findOneAndCheckExistence(where);
    Object.assign(ledgerEntity, dto);
    await this.ledgerEntityEntityRepository.getEntityManager().persist(ledgerEntity).flush();
    return ledgerEntity;
  }

  public async upsert(
    merchantEntity: MerchantEntity,
    assetEntity: AssetEntity,
    fractions: bigint,
  ): Promise<LedgerEntity> {
    let ledgerEntity = await this.findOne({
      asset: assetEntity,
      merchant: merchantEntity,
    });

    if (!ledgerEntity) {
      const showroomEntity = await this.showroomService.findOneAndCheckExistence({
        merchant: merchantEntity,
        isDefault: true,
      });

      ledgerEntity = await this.create(merchantEntity, showroomEntity, assetEntity, 0n);
    }

    Object.assign(ledgerEntity, { fractions: ledgerEntity.fractions + fractions });
    await this.ledgerEntityEntityRepository.getEntityManager().persist(ledgerEntity).flush();
    return ledgerEntity;
  }

  public findAll<Hint extends string = never, Fields extends string = "*">(
    where: FilterQuery<LedgerEntity>,
    options?: FindAllOptions<LedgerEntity, Hint, Fields>,
  ): Promise<Array<Loaded<LedgerEntity, Hint, Fields>>> {
    return this.ledgerEntityEntityRepository.findAll({ ...options, where });
  }

  public async autocomplete(userEntity: UserEntity): Promise<Array<ILedgerAutocompleteResult>> {
    const ledgerEntities = await this.findAll(
      {
        merchant: userEntity.merchant,
      },
      {
        fields: ["id", "asset.title", "fractions"],
        populate: ["asset"],
      },
    );

    return ledgerEntities.map(ledgerEntity => ({
      id: ledgerEntity.asset.id,
      title: ledgerEntity.asset.title,
      fractions: ledgerEntity.fractions,
    }));
  }
}
