import type { IDateBase, ISearchable, IUuidBase } from "../../dto";
import type { IMerchant } from "../infrastructure";
import type { ILedger } from "./ledger";

export interface IShowroom extends IUuidBase, IDateBase, ISearchable {
  subtitle: string;
  imageUrl: string;
  isDefault: boolean;
  /** API list may return UUID string; single-item may return populated object */
  merchant?: string | IMerchant;
  ledgers?: Array<ILedger>;
}
