import type { IIdDateBase } from "../../../dto";

import type { IToken } from "../hierarchy/token";
import type { IContract } from "../hierarchy/contract";
import type { THierarchyEventData, THierarchyEventType } from "./hierarchy";

export type TContractEventType = THierarchyEventType;

export type TContractEventData = THierarchyEventData;

export interface IEventHistory extends IIdDateBase {
  transactionHash: string;
  eventType: TContractEventType;
  eventData: TContractEventData;
  contractId: number | null;
  contract?: IContract;
  tokenId: number | null;
  token?: IToken;
}
