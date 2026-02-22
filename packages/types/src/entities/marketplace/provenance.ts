import type { IUuidBase, IDateBase } from "../../dto";
import type { IMerchant } from "../infrastructure";
import type { IAsset } from "./asset";

export interface IProvenance extends IUuidBase, IDateBase {
  seller?: IMerchant;
  buyer?: IMerchant;
  asset?: IAsset;
  name: string;
  price: number;
  fractions: number;
  txHash: bigint;
  agreementUrl: string;
}
