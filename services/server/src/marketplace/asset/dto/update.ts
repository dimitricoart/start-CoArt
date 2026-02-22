import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayMaxSize,
  ArrayMinSize,
  Equals,
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";

import { maxAssetDescriptionLength } from "@framework/constants";
import { titleMaxLength, titleMinLength } from "@framework/constants";
import {
  AssetType,
  CategoryType,
  IAssetDimensionsDto,
  IAssetUpdateDto,
  IDocumentCreateDto,
  IPhotoCreateDto,
  MaterialType,
  StyleType,
  SubjectType,
} from "@framework/types";

import { PhotoCreateDto } from "../../photo/dto";
// import { IsSafeForWork } from "../../photo/dto/image.validator";
import { AssetDimensionsDto } from "./dimensions";
import { DocumentCreateDto } from "../../document/dto";
import { IsLexical } from "./lexical.validator";

export class AssetUpdateDto implements IAssetUpdateDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  @MinLength(titleMinLength, { message: "tooShort" })
  @MaxLength(titleMaxLength, { message: "tooLong" })
  public title: string;

  @ApiProperty()
  @IsJSON({ message: "patternMismatch" })
  @IsLexical({ maxLength: maxAssetDescriptionLength })
  public description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  // @IsSafeForWork()
  public imageUrl: string;

  @ApiPropertyOptional({
    enum: AssetType,
  })
  @IsOptional()
  @Transform(({ value }) => value as AssetType)
  @IsEnum(AssetType, { message: "badInput" })
  public assetType: AssetType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: "badInput" })
  public isCopyright: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: "badInput" })
  @Equals(true, { message: "valueMissing" })
  public isConfirmed: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateIf(obj => !!obj.isCopyright && obj.artworkCreatedAt !== null)
  @IsString({ message: "typeMismatch" })
  @IsISO8601({}, { message: "patternMismatch" })
  public artworkCreatedAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateIf(obj => !!obj.isCopyright && obj.artistName !== null)
  @IsString({ message: "typeMismatch" })
  public artistName: string;

  @ApiPropertyOptional({
    enum: CategoryType,
  })
  @IsOptional()
  @Transform(({ value }) => value as CategoryType)
  @IsEnum(CategoryType, { message: "badInput" })
  public category: CategoryType;

  @ApiPropertyOptional({
    enum: SubjectType,
  })
  @IsOptional()
  @Transform(({ value }) => value as SubjectType)
  @IsEnum(SubjectType, { message: "badInput" })
  public subject: SubjectType;

  @ApiPropertyOptional({
    enum: StyleType,
  })
  @IsOptional()
  @Transform(({ value }) => value as StyleType)
  @IsEnum(StyleType, { message: "badInput" })
  public style: StyleType;

  @ApiPropertyOptional({
    enum: MaterialType,
  })
  @IsOptional()
  @Transform(({ value }) => value as MaterialType)
  @IsEnum(MaterialType, { message: "badInput" })
  public material: MaterialType;

  @ApiPropertyOptional({ type: () => [PhotoCreateDto] })
  @IsOptional()
  @IsArray({ message: "typeMismatch" })
  @ArrayMinSize(4, { message: "rangeUnderflow" })
  @ArrayMaxSize(10, { message: "rangeOverflow" })
  @ValidateNested()
  @Type(() => PhotoCreateDto)
  public photos: Array<IPhotoCreateDto>;

  @ApiPropertyOptional({ type: () => [DocumentCreateDto] })
  @IsOptional()
  @IsArray({ message: "typeMismatch" })
  @ArrayMinSize(0, { message: "rangeUnderflow" })
  @ArrayMaxSize(10, { message: "rangeOverflow" })
  @ValidateNested()
  @Type(() => DocumentCreateDto)
  public documents: Array<IDocumentCreateDto>;

  @ApiPropertyOptional({ type: () => AssetDimensionsDto })
  @IsOptional()
  @ValidateNested()
  @ValidateIf(o => o.assetType === AssetType.PHYSICAL)
  @Type(() => AssetDimensionsDto)
  public dimensions: IAssetDimensionsDto;
}
