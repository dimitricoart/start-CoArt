import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsUUID, IsOptional } from "class-validator";

import { IProvenanceSearchDto } from "@framework/types";
import { PaginationDto } from "../../../common/dto";

export class ProvenanceSearchDto extends PaginationDto implements IProvenanceSearchDto {
  @ApiProperty()
  @IsUUID(4, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public merchantId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public assetId: string;
}
