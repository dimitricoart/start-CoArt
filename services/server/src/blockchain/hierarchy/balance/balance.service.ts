import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery } from "@mikro-orm/core";

import { BalanceEntity } from "./balance.entity";
import { TokenEntity } from "../token/token.entity";
import { WalletEntity } from "../../wallet/wallet.entity";

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly balanceEntityRepository: EntityRepository<BalanceEntity>,
  ) {}

  public findOne(where: FilterQuery<BalanceEntity>): Promise<BalanceEntity | null> {
    return this.balanceEntityRepository.findOne(where);
  }

  public async create(tokenEntity: TokenEntity, walletEntity: WalletEntity): Promise<BalanceEntity> {
    const balanceEntity = this.balanceEntityRepository.create({
      token: tokenEntity,
      account: walletEntity.address,
      amount: tokenEntity.amount,
    });

    await this.balanceEntityRepository.getEntityManager().persist(balanceEntity).flush();

    return balanceEntity;
  }
}
