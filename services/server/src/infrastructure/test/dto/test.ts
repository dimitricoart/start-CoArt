import { ApiProperty } from "@nestjs/swagger";
import { IsArray, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { IPhotoCreateDto } from "@framework/types";

import { PhotoCreateDto } from "../../../marketplace/photo/dto";

export class TestDto {
  @ApiProperty({ type: () => [PhotoCreateDto] })
  @IsArray({ message: "typeMismatch" })
  @ArrayMinSize(1, { message: "rangeUnderflow" })
  @ValidateNested()
  @Type(() => PhotoCreateDto)
  public photos: Array<IPhotoCreateDto>;
}
