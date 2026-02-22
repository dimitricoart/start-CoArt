import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { IOffer, OfferStatus } from "@framework/types";
import { ns } from "@framework/constants";

import { AssetEntity } from "../asset/asset.entity";
import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { Uint256Type } from "../../infrastructure/database/uint256";

@Entity({ collection: `${ns}.offer` })
export class OfferEntity {
  [EntityRepositoryType]?: IOffer;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @ManyToOne(() => AssetEntity)
  public asset?: AssetEntity;

  @ManyToOne(() => MerchantEntity)
  public merchant?: MerchantEntity;

  @Property({ columnType: "uint256", type: Uint256Type })
  public fractions: bigint;

  @Property({ columnType: "integer" })
  public price: number;

  @Property({ columnType: "offer_status_enum", nullable: true })
  public offerStatus: OfferStatus;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
