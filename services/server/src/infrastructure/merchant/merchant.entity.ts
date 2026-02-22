import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";

import { ns } from "@framework/constants";
import { IMerchant, MerchantStatus } from "@framework/types";

import { WalletEntity } from "../../blockchain/wallet/wallet.entity";
import { ShowroomEntity } from "../../marketplace/showroom/showroom.entity";
import { DraftJSType } from "../database/draft-js";
import { UserEntity } from "../user/user.entity";
import { AssetEntity } from "../../marketplace/asset/asset.entity";

@Entity({ collection: `${ns}.merchant` })
export class MerchantEntity {
  [EntityRepositoryType]?: IMerchant;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @Property({ columnType: "varchar" })
  public title: string;

  @Property({ columnType: "json", type: DraftJSType })
  public subtitle: string;

  @Property({ columnType: "json", type: DraftJSType })
  public description: string;

  @Property({ columnType: "varchar" })
  public email: string;

  @Property({ columnType: "varchar", nullable: true })
  public imageUrl: string;

  @Property({ columnType: "varchar" })
  public backgroundImageUrl: string;

  @Property({ columnType: "integer", default: 0 })
  public priority: number;

  @Enum({
    items: () => MerchantStatus,
    default: MerchantStatus.PENDING,
  })
  public merchantStatus: MerchantStatus;

  @OneToOne(() => WalletEntity, { mappedBy: "merchant" })
  public wallet?: WalletEntity | null;

  @OneToMany(() => ShowroomEntity, showroom => showroom.merchant)
  public showrooms = new Collection<ShowroomEntity>(this);

  @OneToMany(() => AssetEntity, asset => asset.merchant)
  public assets = new Collection<AssetEntity>(this);

  @OneToMany(() => UserEntity, user => user.merchant)
  public users = new Collection<UserEntity>(this);

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
