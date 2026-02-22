import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

import { IDocumentCreateDto } from "@framework/types";

export class DocumentCreateDto implements IDocumentCreateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: "typeMismatch" })
  public id?: string;

  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  public caption: string;

  @ApiProperty()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  public fileUrl: string;
}
