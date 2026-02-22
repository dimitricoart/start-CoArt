import type { IUuidBase } from "../../dto";
import type { IAsset } from "./asset";
import type { IMerchant } from "../infrastructure";

export interface ILedger extends IUuidBase {
  asset?: IAsset;
  merchant?: IMerchant;
  fractions: bigint;
}
