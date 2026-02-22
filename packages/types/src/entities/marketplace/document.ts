import type { IUuidBase } from "../../dto";

import type { IAsset } from "./asset";

export interface IDocument extends IUuidBase {
  fileUrl: string;
  arUrl: string | null;
  contentType: string | null;
  caption: string;
  asset?: IAsset | null;
  priority: number;
}
