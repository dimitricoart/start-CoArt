import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsString, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

import { AssetStatus, IAssetValidateDto } from "@framework/types";

export class AssetValidateDto implements IAssetValidateDto {
  @ApiProperty({
    enum: AssetStatus,
  })
  @Transform(({ value }) => value as AssetStatus)
  @IsEnum(AssetStatus, { message: "badInput" })
  public assetStatus: AssetStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public comment: string;
}
