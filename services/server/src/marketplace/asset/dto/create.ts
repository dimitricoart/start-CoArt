import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayMaxSize,
  ArrayMinSize,
  Equals,
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  IsJSON,
  ValidateIf,
  ValidateNested,
  MinLength,
  MaxLength,
} from "class-validator";
import { Transform, Type } from "class-transformer";

import {
  AssetType,
  CategoryType,
  IAssetCreateDto,
  IAssetDimensionsDto,
  IDocumentCreateDto,
  IPhotoCreateDto,
  MaterialType,
  StyleType,
  SubjectType,
} from "@framework/types";
import { titleMaxLength, titleMinLength } from "@framework/constants";
import { maxAssetDescriptionLength } from "@framework/constants";

import { PhotoCreateDto } from "../../photo/dto";
// import { IsSafeForWork } from "../../photo/dto/image.validator";
import { AssetDimensionsDto } from "./dimensions";
import { DocumentCreateDto } from "../../document/dto";
import { IsLexical } from "./lexical.validator";

export class AssetCreateDto implements IAssetCreateDto {
  @ApiProperty()
  @IsString({ message: "typeMismatch" })
  @MinLength(titleMinLength, { message: "tooShort" })
  @MaxLength(titleMaxLength, { message: "tooLong" })
  public title: string;

  @ApiProperty()
  @IsJSON({ message: "patternMismatch" })
  @IsLexical({ maxLength: maxAssetDescriptionLength })
  public description: string;

  @ApiProperty()
  @IsUrl({}, { message: "patternMismatch" })
  @IsString({ message: "typeMismatch" })
  // @IsSafeForWork()
  public imageUrl: string;

  @ApiProperty({
    enum: AssetType,
  })
  @Transform(({ value }) => value as AssetType)
  @IsEnum(AssetType, { message: "badInput" })
  public assetType: AssetType;

  @ApiProperty()
  @IsBoolean({ message: "badInput" })
  public isCopyright: boolean;

  @ApiProperty()
  @IsBoolean({ message: "badInput" })
  @Equals(true, { message: "valueMissing" })
  public isConfirmed: boolean;

  @ApiPropertyOptional({
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(obj => !!obj.isCopyright && obj.artworkCreatedAt !== null)
  @IsString({ message: "typeMismatch" })
  @IsISO8601({}, { message: "patternMismatch" })
  public artworkCreatedAt: string;

  @ApiPropertyOptional({
    nullable: true,
  })
  @IsOptional()
  @ValidateIf(obj => !!obj.isCopyright && obj.artistName !== null)
  @IsString({ message: "typeMismatch" })
  public artistName: string;

  @ApiProperty({
    enum: CategoryType,
  })
  @Transform(({ value }) => value as CategoryType)
  @IsEnum(CategoryType, { message: "badInput" })
  public category: CategoryType;

  @ApiProperty({
    enum: SubjectType,
  })
  @Transform(({ value }) => value as SubjectType)
  @IsEnum(SubjectType, { message: "badInput" })
  public subject: SubjectType;

  @ApiProperty({
    enum: StyleType,
  })
  @Transform(({ value }) => value as StyleType)
  @IsEnum(StyleType, { message: "badInput" })
  public style: StyleType;

  @ApiProperty({
    enum: MaterialType,
  })
  @Transform(({ value }) => value as MaterialType)
  @IsEnum(MaterialType, { message: "badInput" })
  public material: MaterialType;

  @ApiProperty({ type: () => [PhotoCreateDto] })
  @IsArray({ message: "typeMismatch" })
  @ArrayMinSize(4, { message: "rangeUnderflow" })
  @ArrayMaxSize(10, { message: "rangeOverflow" })
  @ValidateNested()
  @Type(() => PhotoCreateDto)
  public photos: Array<IPhotoCreateDto>;

  @ApiProperty({ type: () => [DocumentCreateDto] })
  @IsArray({ message: "typeMismatch" })
  @ArrayMinSize(0, { message: "rangeUnderflow" })
  @ArrayMaxSize(10, { message: "rangeOverflow" })
  @ValidateNested()
  @Type(() => DocumentCreateDto)
  public documents: Array<IDocumentCreateDto>;

  @ApiProperty({ type: () => AssetDimensionsDto })
  @ValidateNested()
  @ValidateIf(o => o.assetType === AssetType.PHYSICAL)
  @Type(() => AssetDimensionsDto)
  public dimensions: IAssetDimensionsDto;
}
