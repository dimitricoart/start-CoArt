import type { IDateBase, IUuidBase } from "../../dto";
import type { IMerchant } from "../infrastructure";
import type { IAsset } from "../marketplace";

export enum PaykillaStatus {
  NEW = "NEW",
  CREATED = "CREATED",
  EXPIRED = "EXPIRED",
  PAID = "PAID",
}

export interface IPaykilla extends IUuidBase, IDateBase {
  seller?: IMerchant;
  buyer?: IMerchant;
  asset?: IAsset;
  paykillaStatus: PaykillaStatus;
  name: string;
  price: number;
  fractions: bigint;
  externalId: string;
}
