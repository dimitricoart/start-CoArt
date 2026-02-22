import { Entity, PrimaryKey, Property, ManyToOne, EntityRepositoryType, Enum } from "@mikro-orm/core";

import { ns } from "@framework/constants";
import { OtpType, IOtp } from "@framework/types";

import { UserEntity } from "../user/user.entity";

@Entity({ collection: `${ns}.otp` })
export class OtpEntity {
  [EntityRepositoryType]?: IOtp;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @Property({ type: "varchar" })
  public code: string;

  @Enum({ items: () => OtpType })
  public type: OtpType;

  @ManyToOne()
  public user: UserEntity;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
