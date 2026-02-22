import { ISearchableDto } from "../../infrastructure";

export interface IShowroomUpdateDto extends ISearchableDto {
  subtitle: string;
  imageUrl: string;
}
