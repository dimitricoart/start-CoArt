import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsArray, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

import { AssetStatus, IAssetSearchDto } from "@framework/types";

import { PaginationDto } from "../../../common/dto";

export class AssetSearchDto extends PaginationDto implements IAssetSearchDto {
  @ApiPropertyOptional({
    enum: AssetStatus,
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: "typeMismatch" })
  @Transform(({ value }) => value as Array<AssetStatus>)
  @IsEnum(AssetStatus, { each: true, message: "badInput" })
  public assetStatus: Array<AssetStatus>;
}
