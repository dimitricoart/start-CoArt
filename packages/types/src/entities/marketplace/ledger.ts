import type { IUuidBase } from "../../dto";
import type { IAsset } from "./asset";
import type { IMerchant } from "../infrastructure";
import type { IShowroom } from "./showroom";

export interface ILedger extends IUuidBase {
  asset?: IAsset;
  /** API list returns UUID string; single-item may return populated object */
  merchant?: string | IMerchant;
  /** API list returns UUID string; single-item may return populated object */
  showroom?: string | IShowroom;
  /** API returns string (bigint serialization); backend uses bigint */
  fractions: string | bigint;
}
