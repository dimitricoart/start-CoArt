import type { IUuidBase, IDateBase } from "../../dto";
import type { IMerchant } from "../infrastructure";
import type { IAsset } from "./asset";

export interface IProvenance extends IUuidBase, IDateBase {
  seller?: IMerchant;
  buyer?: IMerchant;
  asset?: IAsset;
  name: string;
  price: number;
  /** API returns string (bigint serialization); use Number() when needed for math */
  fractions: string | number;
  txHash: string;
  agreementUrl: string;
}
