import type { IDateBase, IIdBase } from "../../dto";
import type { IAsset } from "./asset";
import type { IUser } from "../infrastructure";

export interface IFavorite extends IIdBase, IDateBase {
  asset?: IAsset;
  user?: IUser;
}
