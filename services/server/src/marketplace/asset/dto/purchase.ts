import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsBoolean, IsString } from "class-validator";

import { IAssetPurchaseDto } from "@framework/types";

export class AssetPurchaseDto implements IAssetPurchaseDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public name: string;

  @ApiProperty()
  @IsBoolean({ message: "badInput" })
  @Equals(true, { message: "valueMissing" })
  public isConfirmed: boolean;
}
