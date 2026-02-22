import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { IFavorite } from "@framework/types";
import { ns } from "@framework/constants";

import { AssetEntity } from "../asset/asset.entity";
import { UserEntity } from "../../infrastructure/user/user.entity";

@Entity({ collection: `${ns}.favorite` })
export class FavoriteEntity {
  [EntityRepositoryType]?: IFavorite;

  @PrimaryKey()
  public id: number;

  @ManyToOne(() => AssetEntity, { inversedBy: "favorites" })
  public asset?: AssetEntity;

  @ManyToOne(() => UserEntity)
  public user?: UserEntity;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
