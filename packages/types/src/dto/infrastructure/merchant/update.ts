import { ISearchableDto } from "../collections";

export interface IMerchantUpdateDto extends ISearchableDto {
  subtitle: string;
  imageUrl: string;
  backgroundImageUrl: string;
}
