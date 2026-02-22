import { Entity, EntityRepositoryType, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { IToken, TokenStatus } from "@framework/types";
import { ns } from "@framework/constants";

import { Uint256Type } from "../../../infrastructure/database/uint256";
import { AssetEntity } from "../../../marketplace/asset/asset.entity";
import { ContractEntity } from "../contract/contract.entity";

@Entity({ collection: `${ns}.token` })
export class TokenEntity {
  [EntityRepositoryType]?: IToken;

  @PrimaryKey()
  public id: number;

  @Property({
    columnType: "uint256",
    type: Uint256Type,
  })
  public amount: bigint;

  @Property({
    columnType: "uint256",
    type: Uint256Type,
  })
  public tokenId: bigint;

  @Property({ columnType: "varchar" })
  public txHash: string;

  @Property({ columnType: "token_status_enum" })
  public tokenStatus: TokenStatus;

  @OneToOne(() => AssetEntity, { mappedBy: "token" })
  public asset?: AssetEntity;

  @ManyToOne(() => ContractEntity)
  public contract?: ContractEntity;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
