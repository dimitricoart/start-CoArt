import type { IDateBase, ISearchable, IUuidBase } from "../../dto";
import type { IMerchant } from "../infrastructure";
import type { ILedger } from "./ledger";

export interface IShowroom extends IUuidBase, IDateBase, ISearchable {
  subtitle: string;
  imageUrl: string;
  isDefault: boolean;
  merchant?: IMerchant;
  ledgers?: Array<ILedger>;
}
