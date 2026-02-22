import type { IEventHistory } from "../events/event";
import type { IToken } from "./token";
import { IDateBase, IIdBase, ISearchable } from "../../../dto";

export enum ContractStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IContract extends IIdBase, IDateBase, ISearchable {
  imageUrl: string;
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  baseTokenURI: string;
  contractStatus: ContractStatus;
  tokens: Array<IToken>;
  history?: Array<IEventHistory>;
}
