import type { ISearchDto } from "../collections";
import { UserRole, UserStatus } from "../../../entities";

export interface IUserSearchDto extends ISearchDto {
  userRoles: Array<UserRole>;
  userStatus: Array<UserStatus>;
}
