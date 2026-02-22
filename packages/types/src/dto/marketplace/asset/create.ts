import type { IPhotoCreateDto } from "../photo/create";
import { IDocumentCreateDto } from "../document/create";
import type {
  AssetOrientation,
  AssetType,
  CategoryType,
  MaterialType,
  StyleType,
  SubjectType,
  UnitType,
} from "../../../entities";

export interface IAssetDimensionsDto {
  height: number;
  width: number;
  depth: number;
  orientation: AssetOrientation;
  units: UnitType;
}

export interface IAssetCreateDto {
  title: string;
  description: string;
  imageUrl: string;
  isCopyright: boolean;
  isConfirmed: boolean;
  artworkCreatedAt: string | null;
  artistName: string | null;
  assetType: AssetType;
  category: CategoryType;
  subject: SubjectType;
  style: StyleType;
  material: MaterialType;
  photos: Array<IPhotoCreateDto>;
  documents: Array<IDocumentCreateDto>;
  dimensions: IAssetDimensionsDto;
}
