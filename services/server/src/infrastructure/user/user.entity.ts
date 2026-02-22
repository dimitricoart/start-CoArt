import { Entity, EntityRepositoryType, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { EnabledLanguages, ns } from "@framework/constants";
import { IUser, UserRole, UserStatus } from "@framework/types";

import { MerchantEntity } from "../merchant/merchant.entity";

@Entity({ collection: `${ns}.user` })
export class UserEntity {
  [EntityRepositoryType]?: IUser;

  @PrimaryKey({ columnType: "uuid", defaultRaw: "uuid_generate_v4()" })
  public id: string;

  @Property({ columnType: "varchar" })
  public sub: string;

  @Property({ columnType: "varchar", nullable: true })
  public displayName?: string;

  @Property({ columnType: "varchar", nullable: true })
  public email?: string;

  @Property({ columnType: "varchar", nullable: true })
  public imageUrl?: string;

  @Enum({
    items: () => EnabledLanguages,
    default: EnabledLanguages.EN,
  })
  public language?: EnabledLanguages;

  @Enum({ items: () => UserRole, array: true, default: [UserRole.CUSTOMER] })
  public userRoles: Array<UserRole>;

  @Enum({
    items: () => UserStatus,
    default: UserStatus.PENDING,
  })
  public userStatus: UserStatus;

  @ManyToOne(() => MerchantEntity, { inversedBy: "users", nullable: true, eager: true })
  public merchant: MerchantEntity;

  @Property()
  public createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt? = new Date();
}
