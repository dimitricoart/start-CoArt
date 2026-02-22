import type { IUuidDateBase } from "../../dto";

import type { IUser } from "./user";

export enum OtpType {
  INVITE = "INVITE",
}

export interface IOtp extends IUuidDateBase {
  otpType: OtpType;
  data: Record<string, string>;
  userId: number;
  user?: IUser;
}
