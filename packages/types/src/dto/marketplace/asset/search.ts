import { IPaginationDto } from "../../infrastructure/collections";
import { AssetStatus } from "../../../entities";

export interface IAssetSearchDto extends IPaginationDto {
  assetStatus: Array<AssetStatus>;
}
