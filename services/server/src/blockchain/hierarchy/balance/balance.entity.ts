import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { IBalance } from "@framework/types";
import { ns } from "@framework/constants";

import { TokenEntity } from "../token/token.entity";

@Entity({ collection: `${ns}.balance` })
export class BalanceEntity {
  [EntityRepositoryType]?: IBalance;

  @PrimaryKey()
  public id: number;

  @Property({ columnType: "varchar" })
  public account: string;

  @Property({ columnType: "uint256" })
  public amount: bigint;

  @ManyToOne(() => TokenEntity)
  public token?: TokenEntity;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
