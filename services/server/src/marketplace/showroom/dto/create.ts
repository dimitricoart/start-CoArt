import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

import { IShowroomCreateDto } from "@framework/types";

import { SearchableDto } from "../../../common/dto";

// import { IsSafeForWork } from "../../photo/dto/image.validator";

export class ShowroomCreateDto extends SearchableDto implements IShowroomCreateDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public subtitle: string;

  @ApiProperty()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  // @IsSafeForWork()
  public imageUrl: string;
}
