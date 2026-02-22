import type { IDateBase, IUuidBase } from "../../dto";
import type { IAsset } from "./asset";
import type { IMerchant } from "../infrastructure";

export enum OfferStatus {
  AVAILABLE = "AVAILABLE",
  TXAWAIT = "TXAWAIT",
  PAID = "PAID",
  DELETED = "DELETED",
}

export interface IOffer extends IUuidBase, IDateBase {
  asset?: IAsset;
  merchant?: IMerchant;
  fractions: bigint;
  price: number;
  offerStatus: OfferStatus;
}
