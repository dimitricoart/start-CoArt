import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min, IsEnum, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

import { AssetOrientation, UnitType } from "@framework/types";

import { ValidateDimensions } from "./dimensions.validator";

export class AssetDimensionsDto {
  @ApiProperty({
    enum: AssetOrientation,
  })
  @Transform(({ value }) => value as AssetOrientation)
  @IsEnum(AssetOrientation, { message: "badInput" })
  @ValidateDimensions()
  public orientation: AssetOrientation;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: "patternMismatch" })
  @Min(1, { message: "rangeUnderflow" })
  public height: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: "patternMismatch" })
  @Min(1, { message: "rangeUnderflow" })
  public width: number;

  @ApiProperty()
  @IsInt({ message: "typeMismatch" })
  @Min(1, { message: "rangeUnderflow" })
  public depth: number;

  @ApiProperty({
    enum: UnitType,
  })
  @Transform(({ value }) => value as UnitType)
  @IsEnum(UnitType, { message: "badInput" })
  public units: UnitType;
}
