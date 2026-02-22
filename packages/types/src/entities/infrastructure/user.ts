import { EnabledLanguages } from "@framework/constants";

import { IMerchant } from "./merchant";
import { IUuidBase } from "../../dto";

export enum UserRole {
  SUPER = "SUPER",
  ADMIN = "ADMIN",
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  CUSTOMER = "CUSTOMER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}

export interface IUser extends IUuidBase {
  displayName?: string;
  email?: string;
  language?: EnabledLanguages;
  imageUrl?: string;
  userRoles: Array<UserRole>;
  userStatus: UserStatus;
  merchant?: IMerchant;
}
