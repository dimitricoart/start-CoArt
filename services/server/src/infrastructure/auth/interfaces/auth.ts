import { IUser } from "@framework/types";

export interface IAuth {
  refreshToken: string;
  refreshTokenExpiresAt: number;
  user?: IUser;
  userId: number;
}
