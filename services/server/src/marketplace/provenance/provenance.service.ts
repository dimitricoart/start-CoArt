import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery } from "@mikro-orm/core";

import { AssetStatus, IProvenanceSearchDto } from "@framework/types";
import type { IPaginationDto } from "@framework/types";

import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { AssetEntity } from "../asset/asset.entity";
import { ProvenanceEntity } from "./provenance.entity";

@Injectable()
export class ProvenanceService {
  constructor(
    @InjectRepository(ProvenanceEntity)
    private readonly provenanceEntityRepository: EntityRepository<ProvenanceEntity>,
  ) {}

  public search(dto: IProvenanceSearchDto): Promise<[Array<ProvenanceEntity>, number]> {
    const { merchantId, assetId } = dto;
    const where: FilterQuery<ProvenanceEntity> = {
      $and: [
        {
          $or: [{ seller: merchantId }, { buyer: merchantId }],
        },
      ],
    };

    if (assetId) {
      where.$and!.push({ asset: { id: assetId } });
    }

    return this.provenanceEntityRepository.findAndCount(where, {
      populate: ["asset"],
      orderBy: { createdAt: "desc" },
    });
  }

  public recent(dto: IPaginationDto): Promise<[Array<ProvenanceEntity>, number]> {
    const { skip, take } = dto;
    const qb = this.provenanceEntityRepository
      .createQueryBuilder("p")
      .leftJoinAndSelect("p.asset", "a")
      .where({
        "a.assetStatus": AssetStatus.FINALIZED,
      })
      .andWhere(
        `p.id IN (
        SELECT DISTINCT ON (asset_id) id
        FROM coart.provenance
        ORDER BY asset_id, created_at DESC
      )`,
      )
      .orderBy({ "p.createdAt": "desc" })
      .limit(take)
      .offset(skip);

    return qb.getResultAndCount();
  }

  public async create(
    sellerEntity: MerchantEntity,
    buyerEntity: MerchantEntity,
    assetEntity: AssetEntity,
    name: string,
    price: number,
    fractions: bigint,
    txHash: string,
    agreementUrl: string,
  ): Promise<ProvenanceEntity> {
    const provenanceEntity = this.provenanceEntityRepository.create({
      seller: sellerEntity,
      buyer: buyerEntity,
      asset: assetEntity,
      fractions,
      name,
      price,
      txHash,
      agreementUrl,
    });

    await this.provenanceEntityRepository.getEntityManager().persist(provenanceEntity).flush();

    return provenanceEntity;
  }
}
