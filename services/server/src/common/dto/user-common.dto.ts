import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { Transform } from "class-transformer";

import { EnabledLanguages } from "@framework/constants";
import type { IUserCommonDto } from "@framework/types";

export class DisplayNameDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public displayName?: string;
}

export class EmailDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({}, { message: "patternMismatch" })
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  public email?: string;
}

export class ImageUrlDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString()
  public imageUrl?: string;
}

export class UserCommonDto implements IUserCommonDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public displayName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({}, { message: "patternMismatch" })
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  public email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString()
  public imageUrl?: string;

  @ApiPropertyOptional({ enum: EnabledLanguages })
  @IsOptional()
  @IsString()
  public language?: EnabledLanguages;
}
