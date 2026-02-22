import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import type { IDocument } from "@framework/types";
import { ns } from "@framework/constants";

import { AssetEntity } from "../asset/asset.entity";

@Entity({ collection: `${ns}.document` })
export class DocumentEntity {
  [EntityRepositoryType]?: IDocument;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @Property({ columnType: "varchar" })
  public caption: string;

  @Property({ columnType: "varchar" })
  public fileUrl: string;

  @Property({ columnType: "varchar", nullable: true })
  public arUrl: string | null;

  @Property({ columnType: "varchar", nullable: true })
  public contentType: string | null;

  @Property({ columnType: "integer" })
  public priority: number;

  @ManyToOne(() => AssetEntity, { inversedBy: "documents" })
  public asset?: AssetEntity;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
