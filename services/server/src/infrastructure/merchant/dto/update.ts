import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";
import { Mixin } from "ts-mixer";

import { SearchableDto } from "../../../common/dto";
import { IMerchantUpdateDto } from "@framework/types";

export class MerchantUpdateDto extends Mixin(SearchableDto) implements IMerchantUpdateDto {
  @ApiPropertyOptional()
  @IsString({ message: "typeMismatch" })
  public subtitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public imageUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  // @IsSafeForWork()
  public backgroundImageUrl: string;
}
