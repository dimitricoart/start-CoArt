import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

import { ILedgerSearchDto } from "@framework/types";

import { PaginationDto } from "../../../common/dto";

export class LedgerSearchDto extends PaginationDto implements ILedgerSearchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public showroomId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public merchantId: string;
}
