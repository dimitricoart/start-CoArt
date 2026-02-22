import type { IUuidBase } from "../../dto";

import type { IAsset } from "./asset";

export interface IPhoto extends IUuidBase {
  caption: string;
  imageUrl: string;
  asset?: IAsset | null;
  priority: number;
}
