import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBooleanString, IsOptional, IsString, IsUUID } from "class-validator";

import { IShowroomSearchDto } from "@framework/types";

import { PaginationDto } from "../../../common/dto";

export class ShowroomSearchDto extends PaginationDto implements IShowroomSearchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString({ message: "badInput" })
  public displayEmpty: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public merchantId: string;
}
