import { ISearchable, IUuidBase } from "../../dto";
import type { IWallet } from "../blockchain";
import type { IAsset, IShowroom } from "../marketplace";
import type { IUser } from "./user";

export enum MerchantStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}

export interface IMerchant extends IUuidBase, ISearchable {
  subtitle: string;
  email: string;
  imageUrl: string;
  backgroundImageUrl: string;
  priority: number;
  merchantStatus: MerchantStatus;
  wallet?: IWallet | null;
  assets?: Array<IAsset>;
  showrooms?: Array<IShowroom>;
  users?: Array<IUser>;
}
