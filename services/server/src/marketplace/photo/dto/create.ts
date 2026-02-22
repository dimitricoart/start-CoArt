import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsUrl, IsOptional } from "class-validator";

import { IPhotoCreateDto } from "@framework/types";

// import { IsSafeForWork } from "./image.validator";

export class PhotoCreateDto implements IPhotoCreateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public caption: string;

  @ApiProperty()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  // @IsSafeForWork()
  public imageUrl: string;
}
