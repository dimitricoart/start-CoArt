import { Collection, Entity, EntityRepositoryType, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";

import { ContractStatus, IContract } from "@framework/types";
import { ns } from "@framework/constants";

import { DraftJSType } from "../../../infrastructure/database/draft-js";
import { TokenEntity } from "../token/token.entity";

@Entity({ collection: `${ns}.contract` })
export class ContractEntity {
  [EntityRepositoryType]?: IContract;

  @PrimaryKey()
  public id: number;

  @Property({ columnType: "varchar" })
  public title: string;

  @Property({ columnType: "json", type: DraftJSType })
  public description: string;

  @Property({ columnType: "varchar" })
  public imageUrl: string;

  @Property({ columnType: "varchar" })
  public address: string;

  @Property({ columnType: "integer" })
  public chainId: number;

  @Property({ columnType: "varchar" })
  public symbol: string;

  @Property({ columnType: "integer" })
  public decimals: number;

  @Property({ columnType: "varchar" })
  public baseTokenURI: string;

  @Property({ columnType: "contract_status_enum" })
  public contractStatus: ContractStatus;

  @OneToMany(() => TokenEntity, tokens => tokens.contract)
  public tokens = new Collection<TokenEntity>(this);

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
