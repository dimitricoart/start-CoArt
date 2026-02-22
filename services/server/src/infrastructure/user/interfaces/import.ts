import type { IUserCommonDto, UserRole, UserStatus } from "@framework/types";

export interface IUserImportDto extends Partial<IUserCommonDto> {
  userStatus: UserStatus;
  userRoles: Array<UserRole>;
  sub: string;
}
