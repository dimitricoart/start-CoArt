import type { IContract } from "./contract";
import type { IDateBase, IIdBase } from "../../../dto";
import type { IAsset } from "../../marketplace";
// import type { IBalance } from "./balance";
// import type { IEventHistory } from "../events/event";

export enum TokenStatus {
  MINTED = "MINTED",
  BURNED = "BURNED",
}

export interface IToken extends IIdBase, IDateBase {
  amount: bigint;
  contractId: number;
  contract?: IContract;
  tokenStatus: TokenStatus;
  tokenId: bigint;
  txHash: string;
  asset?: Array<IAsset>;
  // balance?: Array<IBalance>;
  // history?: Array<IEventHistory>;
}
