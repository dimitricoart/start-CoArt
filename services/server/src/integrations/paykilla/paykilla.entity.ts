import { Entity, EntityRepositoryType, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { ns } from "@framework/constants";
import { IPaykilla, PaykillaStatus } from "@framework/types";

import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { Uint256Type } from "../../infrastructure/database/uint256";
import { OfferEntity } from "../../marketplace/offer/offer.entity";

@Entity({ collection: `${ns}.paykilla` })
export class PaykillaEntity {
  [EntityRepositoryType]?: IPaykilla;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @Enum({
    items: () => PaykillaStatus,
    default: PaykillaStatus.NEW,
  })
  public paykillaStatus: PaykillaStatus;

  @ManyToOne(() => MerchantEntity)
  public seller?: MerchantEntity;

  @ManyToOne(() => MerchantEntity)
  public buyer?: MerchantEntity;

  @ManyToOne(() => OfferEntity)
  public offer?: OfferEntity;

  @Property({ columnType: "varchar" })
  public name: string;

  @Property({ columnType: "integer" })
  public price: number;

  @Property({ columnType: "uint256", type: Uint256Type })
  public fractions: bigint;

  @Property({ columnType: "varchar" })
  public externalId: string;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
