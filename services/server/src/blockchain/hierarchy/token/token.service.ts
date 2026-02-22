import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery, raw } from "@mikro-orm/core";
import { zeroHash } from "viem";

import { TokenStatus } from "@framework/types";

import { AssetEntity } from "../../../marketplace/asset/asset.entity";
import { SignerService } from "../../signer/signer.service";
import { ContractEntity } from "../contract/contract.entity";
import { ContractService } from "../contract/contract.service";
import { TokenEntity } from "./token.entity";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenEntityRepository: EntityRepository<TokenEntity>,
    private readonly contractService: ContractService,
    private readonly signerService: SignerService,
  ) {}

  public findOne(where: FilterQuery<TokenEntity>): Promise<TokenEntity | null> {
    return this.tokenEntityRepository.findOne(where);
  }

  public async create(assetEntity: AssetEntity, amount: bigint, arHash: string): Promise<TokenEntity> {
    const contractEntity = await this.contractService.findOneAndCheckExistence({ id: 1 });

    const tokenId = await this.getMaxTokenIdForContract(contractEntity);

    const tokenEntity = this.tokenEntityRepository.create({
      amount,
      contract: contractEntity,
      asset: assetEntity,
      tokenId: tokenId + 1n,
      tokenStatus: TokenStatus.MINTED,
      txHash: zeroHash,
    });

    const txHash = await this.signerService.mint(tokenEntity, assetEntity.merchant!.wallet!);
    await this.signerService.setTokenURI(tokenEntity, arHash);

    Object.assign(tokenEntity, {
      txHash,
    });

    await this.tokenEntityRepository.getEntityManager().persist(tokenEntity).flush();

    return tokenEntity;
  }

  public async getMaxTokenIdForContract(contractEntity: ContractEntity): Promise<bigint> {
    const queryBuilder = this.tokenEntityRepository.createQueryBuilder("token");
    queryBuilder.select(raw("row_number() OVER () AS id, coalesce(max(token.token_id), 0) as token_id"));
    queryBuilder.leftJoin("token.contract", "contract");
    queryBuilder.where({ contract: contractEntity });
    const result = await queryBuilder.getSingleResult();
    return BigInt(result!.tokenId);
  }
}
