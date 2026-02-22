import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

import type { IAssetProposePriceDto } from "../interfaces";

export class AssetProposePriceDto implements IAssetProposePriceDto {
  @ApiProperty()
  @IsEmail({}, { message: "patternMismatch" })
  public email: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public message: string;
}
