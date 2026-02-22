import { IPaginationDto } from "../../infrastructure/collections";

export interface IProvenanceSearchDto extends IPaginationDto {
  assetId: string;
  merchantId: string;
}
