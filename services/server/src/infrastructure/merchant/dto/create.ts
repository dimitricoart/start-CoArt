import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { Transform } from "class-transformer";
import { Mixin } from "ts-mixer";

import { emailMaxLength } from "@framework/constants";
import { SearchableDto } from "../../../common/dto";
import type { IMerchantCreateDto } from "@framework/types";

export class MerchantCreateDto extends Mixin(SearchableDto) implements IMerchantCreateDto {
  @ApiProperty({
    maxLength: emailMaxLength,
  })
  @IsEmail({}, { message: "patternMismatch" })
  @MaxLength(emailMaxLength, { message: "rangeOverflow" })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  public email: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public subtitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public imageUrl: string;

  @ApiProperty()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  // @IsSafeForWork()
  public backgroundImageUrl: string;
}
