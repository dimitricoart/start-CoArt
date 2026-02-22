import { AssetStatus } from "../../../entities";

export interface IAssetValidateDto {
  assetStatus: AssetStatus;
  comment?: string;
}
