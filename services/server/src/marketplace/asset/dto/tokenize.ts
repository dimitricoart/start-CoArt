import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsBoolean, IsString } from "class-validator";

import { IAssetTokenizeDto } from "@framework/types";

export class AssetTokenizeDto implements IAssetTokenizeDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public name: string;

  @ApiProperty()
  @IsBoolean({ message: "badInput" })
  @Equals(true, { message: "valueMissing" })
  public isConfirmed: boolean;
}
