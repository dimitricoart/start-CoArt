import type { IIdDateBase } from "../../../dto";

import type { IToken } from "./token";

export interface IBalance extends IIdDateBase {
  account: string;
  amount: bigint;
  tokenId: number;
  token?: IToken;
}
