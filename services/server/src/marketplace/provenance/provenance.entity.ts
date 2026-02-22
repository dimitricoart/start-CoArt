import { Entity, EntityRepositoryType, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";

import type { IProvenance } from "@framework/types";
import { ns } from "@framework/constants";

import { Uint256Type } from "../../infrastructure/database/uint256";
import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { AssetEntity } from "../asset/asset.entity";

@Entity({ collection: `${ns}.provenance` })
export class ProvenanceEntity {
  [EntityRepositoryType]?: IProvenance;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @OneToOne(() => MerchantEntity, { eager: true })
  public seller?: MerchantEntity;

  @OneToOne(() => MerchantEntity, { eager: true })
  public buyer?: MerchantEntity;

  @ManyToOne(() => AssetEntity, { inversedBy: "provenance" })
  public asset?: AssetEntity;

  @Property({ columnType: "varchar" })
  public name: string;

  @Property({ columnType: "integer" })
  public price: number;

  @Property({ columnType: "uint256", type: Uint256Type })
  public fractions: bigint;

  @Property({ columnType: "varchar" })
  public txHash: string;

  @Property({ columnType: "varchar", hidden: true })
  public agreementUrl: string;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
