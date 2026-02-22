import { IPaginationDto } from "../../infrastructure/collections";

export interface ILedgerSearchDto extends IPaginationDto {
  showroomId: string;
  merchantId: string;
}
