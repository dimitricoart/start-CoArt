import type { IDateBase, IUuidBase } from "../../dto";
import type { IMerchant } from "../infrastructure";
import type { IAsset } from "../marketplace";

export enum StripeCheckoutStatus {
  NEW = "NEW",
  CREATED = "CREATED",
  EXPIRED = "EXPIRED",
  PAID = "PAID",
}

export interface IStripeCheckout extends IUuidBase, IDateBase {
  seller?: IMerchant;
  buyer?: IMerchant;
  asset?: IAsset;
  stripeCheckoutStatus: StripeCheckoutStatus;
  name: string;
  price: number;
  fractions: bigint;
  externalId: string;
}
