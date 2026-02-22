import { Entity, EntityRepositoryType, PrimaryKey, Property, OneToMany, Collection, ManyToOne } from "@mikro-orm/core";

import type { IShowroom } from "@framework/types";
import { ns } from "@framework/constants";

import { DraftJSType } from "../../infrastructure/database/draft-js";
import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { LedgerEntity } from "../ledger/ledger.entity";

@Entity({ collection: `${ns}.showroom` })
export class ShowroomEntity {
  [EntityRepositoryType]?: IShowroom;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @Property({ columnType: "varchar" })
  public title: string;

  @Property({ columnType: "json", type: DraftJSType })
  public subtitle: string;

  @Property({ columnType: "json", type: DraftJSType })
  public description: string;

  @Property({ columnType: "varchar" })
  public imageUrl: string;

  @Property({ columnType: "boolean", default: false })
  public isDefault = false;

  @ManyToOne(() => MerchantEntity)
  public merchant?: MerchantEntity;

  @OneToMany(() => LedgerEntity, ledger => ledger.showroom)
  public ledgers? = new Collection<LedgerEntity>(this);

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
