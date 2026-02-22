import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumberString, IsString, IsUUID, Matches } from "class-validator";

import { IOfferCreateDto } from "@framework/types";

export class OfferCreateDto implements IOfferCreateDto {
  @ApiProperty()
  @IsUUID(4, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public assetId: string;

  @ApiProperty()
  @IsNumberString({ no_symbols: true }, { message: "typeMismatch" })
  @Matches(/^[1-9]\d*$/, { message: "rangeUnderflow" })
  public fractions: bigint;

  @ApiProperty()
  @IsInt({ message: "typeMismatch" })
  public price: number;
}
