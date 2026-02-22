import { ISearchableDto } from "../../infrastructure";

export interface IShowroomCreateDto extends ISearchableDto {
  subtitle: string;
  imageUrl: string;
}
