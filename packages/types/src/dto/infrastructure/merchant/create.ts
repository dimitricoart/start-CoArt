import { ISearchableDto } from "../collections";

export interface IMerchantCreateDto extends ISearchableDto {
  email: string;
  subtitle: string;
  imageUrl: string;
  backgroundImageUrl: string;
}
