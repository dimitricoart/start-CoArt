import { Entity, EntityRepositoryType, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { ns } from "@framework/constants";
import type { IWallet } from "@framework/types";

import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";

@Entity({ collection: `${ns}.wallet` })
export class WalletEntity {
  [EntityRepositoryType]?: IWallet;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @OneToOne(() => MerchantEntity, { inversedBy: "wallet" })
  public merchant: MerchantEntity;

  @Property({ columnType: "varchar" })
  public address: string;

  @Property({ columnType: "varchar", hidden: true })
  public privateKey: string;

  @Property({ columnType: "varchar" })
  public multisig: string;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
