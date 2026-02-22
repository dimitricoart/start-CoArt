import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  OneToOne,
} from "@mikro-orm/core";

import {
  AssetOrientation,
  AssetStatus,
  AssetType,
  CategoryType,
  IAsset,
  MaterialType,
  StyleType,
  SubjectType,
  UnitType,
} from "@framework/types";
import { ns } from "@framework/constants";

import { DraftJSType } from "../../infrastructure/database/draft-js";
import { PhotoEntity } from "../photo/photo.entity";
import { ProvenanceEntity } from "../provenance/provenance.entity";
import { TokenEntity } from "../../blockchain/hierarchy/token/token.entity";
import { Uint256Type } from "../../infrastructure/database/uint256";
import { FavoriteEntity } from "../favorite/favorite.entity";
import { DocumentEntity } from "../document/document.entity";
import { LedgerEntity } from "../ledger/ledger.entity";
import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { OfferEntity } from "../offer/offer.entity";

@Embeddable()
export class Dimensions {
  @Property({ nullable: true })
  public orientation: AssetOrientation;

  @Property({ nullable: true })
  public height: number;

  @Property({ nullable: true })
  public width: number;

  @Property({ nullable: true })
  public depth: number;

  @Property({ columnType: "asset_unit_enum", nullable: true })
  public units: UnitType;
}

@Entity({ collection: `${ns}.asset` })
export class AssetEntity {
  [EntityRepositoryType]?: IAsset;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @Property({ columnType: "varchar" })
  public title: string;

  @Property({ columnType: "json", type: DraftJSType })
  public description: string;

  @Property({ columnType: "varchar" })
  public imageUrl: string;

  @Property({ columnType: "uint256", type: Uint256Type })
  public fractions: bigint;

  @Property({ columnType: "boolean" })
  public isCopyright = false;

  @Property({ columnType: "timestamptz", nullable: true })
  public artworkCreatedAt: string | null = null;

  @Property({ columnType: "varchar", nullable: true })
  public artistName: string | null = null;

  @Property({ columnType: "asset_type_enum" })
  public assetType: AssetType;

  @Property({ columnType: "asset_status_enum" })
  public assetStatus: AssetStatus;

  @Property({ columnType: "asset_category_enum" })
  public category: CategoryType;

  @Property({ columnType: "asset_subject_enum" })
  public subject: SubjectType;

  @Property({ columnType: "asset_style_enum" })
  public style: StyleType;

  @Property({ columnType: "asset_material_enum" })
  public material: MaterialType;

  @ManyToOne(() => MerchantEntity, { inversedBy: "assets" })
  public merchant?: MerchantEntity;

  @OneToOne(() => TokenEntity, { inversedBy: "asset", nullable: true })
  public token?: TokenEntity;

  @OneToMany(() => PhotoEntity, photo => photo.asset)
  public photos = new Collection<PhotoEntity>(this);

  @OneToMany(() => OfferEntity, offer => offer.asset)
  public offers = new Collection<OfferEntity>(this);

  @OneToMany(() => DocumentEntity, document => document.asset)
  public documents = new Collection<DocumentEntity>(this);

  @OneToMany(() => ProvenanceEntity, provenance => provenance.asset)
  public provenance = new Collection<ProvenanceEntity>(this);

  @OneToMany(() => FavoriteEntity, favorite => favorite.asset)
  public favorites = new Collection<FavoriteEntity>(this);

  @OneToMany(() => LedgerEntity, ledger => ledger.asset)
  public ledger = new Collection<LedgerEntity>(this);

  @Embedded(() => Dimensions, { nullable: true })
  public dimensions: Dimensions;

  @Property({ columnType: "varchar", nullable: true })
  public comment: string | null;

  @Property({ columnType: "varchar", nullable: true })
  public seller: string | null;

  @Property({ columnType: "varchar", nullable: true })
  public arUrl: string | null;

  @Property({ columnType: "varchar", nullable: true, hidden: true })
  public agreementUrl: string | null;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
