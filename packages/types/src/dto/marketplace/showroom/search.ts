import { IPaginationDto } from "../../infrastructure/collections";

export interface IShowroomSearchDto extends IPaginationDto {
  merchantId: string;
  displayEmpty: boolean;
}
