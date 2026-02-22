import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsUrl, IsOptional } from "class-validator";

import { IShowroomUpdateDto } from "@framework/types";

import { SearchableDto } from "../../../common/dto";

// import { IsSafeForWork } from "../../photo/dto/image.validator";

export class ShowroomUpdateDto extends SearchableDto implements IShowroomUpdateDto {
  @ApiPropertyOptional()
  @IsString({ message: "typeMismatch" })
  public subtitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  // @IsSafeForWork()
  public imageUrl: string;
}
