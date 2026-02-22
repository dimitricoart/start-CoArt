import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { ILedger } from "@framework/types";
import { ns } from "@framework/constants";

import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { Uint256Type } from "../../infrastructure/database/uint256";
import { AssetEntity } from "../asset/asset.entity";
import { ShowroomEntity } from "../showroom/showroom.entity";

@Entity({ collection: `${ns}.ledger` })
export class LedgerEntity {
  [EntityRepositoryType]?: ILedger;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @ManyToOne(() => AssetEntity, { inversedBy: "ledger" })
  public asset: AssetEntity;

  @ManyToOne(() => MerchantEntity)
  public merchant: MerchantEntity;

  @ManyToOne(() => ShowroomEntity)
  public showroom: ShowroomEntity;

  @Property({ columnType: "uint256", type: Uint256Type })
  public fractions: bigint;
}
