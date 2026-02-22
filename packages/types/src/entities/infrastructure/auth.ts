import type { IIdDateBase } from "../../dto";

export interface IAuth extends IIdDateBase {
  ip: string;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}
