import type { IUuidBase } from "../../dto";

export interface IWallet extends IUuidBase {
  merchant_id: string;
  address: string;
  privateKey: string;
  multisig: string;
}
