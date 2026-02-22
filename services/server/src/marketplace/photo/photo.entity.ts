import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import type { IPhoto } from "@framework/types";
import { ns } from "@framework/constants";

import { AssetEntity } from "../asset/asset.entity";

@Entity({ collection: `${ns}.photo` })
export class PhotoEntity {
  [EntityRepositoryType]?: IPhoto;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @Property({ columnType: "varchar" })
  public caption: string;

  @Property({ columnType: "varchar" })
  public imageUrl: string;

  @Property({ columnType: "integer" })
  public priority: number;

  @ManyToOne(() => AssetEntity, { inversedBy: "photos" })
  public asset?: AssetEntity;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
