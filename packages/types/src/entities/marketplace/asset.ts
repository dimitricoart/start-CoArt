import { IAssetDimensionsDto, IDateBase, ISearchable, IUuidBase } from "../../dto";
import type { IMerchant } from "../infrastructure";
import type { IPhoto } from "./photo";
import type { IProvenance } from "./provenance";
import type { IToken } from "../blockchain";
import type { IFavorite } from "./favorite";
import type { IDocument } from "./document";
import type { IOffer } from "./offer";

export enum AssetOrientation {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
  SQUARE = "SQUARE",
}

export enum AssetType {
  PHYSICAL = "PHYSICAL",
  DIGITAL = "DIGITAL",
}

export enum AssetStatus {
  NEW = "NEW",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  REJECTED = "REJECTED",
  FINALIZED = "FINALIZED",
}

export enum CategoryType {
  PAINTINGS = "PAINTINGS",
  DRAWINGS = "DRAWINGS",
  MIXED_MEDIA = "MIXED_MEDIA",
  SCULPTURE = "SCULPTURE",
  PHOTOGRAPHY = "PHOTOGRAPHY",
  PRINTS = "PRINTS",
  JEWELRY = "JEWELRY",
  WATCHES = "WATCHES",
  PRECIOUS_OBJECTS = "PRECIOUS_OBJECTS",
  OBJET_D_ART = "OBJET_D_ART",
  DECORATIVE_OBJECTS = "DECORATIVE_OBJECTS",
  CLOCKS = "CLOCKS",
  ICONS_AND_RELIGIOUS_OBJECTS = "ICONS_AND_RELIGIOUS_OBJECTS",
  VINTAGE_OBJECTS = "VINTAGE_OBJECTS",
  COINS = "COINS",
  MEDALS = "MEDALS",
  STAMPS = "STAMPS",
  TOYS = "TOYS",
  SPORTS_MEMORABILIA = "SPORTS_MEMORABILIA",
  LUXURY_GOODS = "LUXURY_GOODS",
  RARE_ITEMS_RWA_LUXURY_ASSET_CLASS = "RARE_ITEMS_RWA_LUXURY_ASSET_CLASS",
  CRAFTS = "CRAFTS",
  FOLK_ART = "FOLK_ART",
  MANUSCRIPTS = "MANUSCRIPTS",
  BOOKS = "BOOKS",
  INSTRUMENTS = "INSTRUMENTS",
  OTHER = "OTHER",
}

export enum SubjectType {
  ABSTRACT = "ABSTRACT",
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT",
  PEOPLE = "PEOPLE",
  WOMEN = "WOMEN",
  MEN = "MEN",
  ANIMAL = "ANIMAL",
  NATURE = "NATURE",
  CITYSCAPE = "CITYSCAPE",
  STILL_LIFE = "STILL_LIFE",
  FLORAL = "FLORAL",
  NUDE = "NUDE",
  FANTASY = "FANTASY",
  RELIGION = "RELIGION",
  MYTHOLOGY = "MYTHOLOGY",
  ARCHITECTURE = "ARCHITECTURE",
  OTHER = "OTHER",
}

export enum StyleType {
  ABSTRACT = "ABSTRACT",
  EXPRESSIONISM = "EXPRESSIONISM",
  IMPRESSIONISM = "IMPRESSIONISM",
  CONCEPTUAL = "CONCEPTUAL",
  MINIMALISM = "MINIMALISM",
  REALISM = "REALISM",
  MODERN = "MODERN",
  CONTEMPORARY = "CONTEMPORARY",
  FINE_ART = "FINE_ART",
  POP_ART = "POP_ART",
  SURREALISM = "SURREALISM",
  SYMBOLISM = "SYMBOLISM",
  FIGURATIVE = "FIGURATIVE",
  PRIMITIVISM = "PRIMITIVISM",
  ART_DECO = "ART_DECO",
  ART_NOUVEAU = "ART_NOUVEAU",
  VICTORIAN = "VICTORIAN",
  EDWARDIAN = "EDWARDIAN",
  GEORGIAN = "GEORGIAN",
  LOUIS_XVI_EMPIRE = "LOUIS_XVI_EMPIRE",
  MID_CENTURY = "MID_CENTURY",
  ORIENTAL = "ORIENTAL",
  FABERGE_STYLE_OBJECTS = "FABERGE_STYLE_OBJECTS",
  IMPERIAL_STYLE = "IMPERIAL_STYLE",
  VICTORIAN_JEWELRY = "VICTORIAN_JEWELRY",
  MODERNIST_JEWELRY = "MODERNIST_JEWELRY",
  CONTEMPORARY_JEWELRY = "CONTEMPORARY_JEWELRY",
  OTHER = "OTHER",
}

export enum MaterialType {
  OIL_ON_CANVAS = "OIL_ON_CANVAS",
  ACRYLIC_ON_CANVAS = "ACRYLIC_ON_CANVAS",
  TEMPERA = "TEMPERA",
  WATERCOLOR = "WATERCOLOR",
  GOUACHE = "GOUACHE",
  ENCAUSTIC = "ENCAUSTIC",
  MIXED_MEDIA = "MIXED_MEDIA",
  DIGITAL_PRINT = "DIGITAL_PRINT",
  LITHOGRAPH = "LITHOGRAPH",
  ETCHING = "ETCHING",
  GOLD = "GOLD",
  SILVER = "SILVER",
  PLATINUM = "PLATINUM",
  ENAMEL = "ENAMEL",
  DIAMONDS = "DIAMONDS",
  RUBIES = "RUBIES",
  SAPPHIRES = "SAPPHIRES",
  PRECIOUS_STONES = "PRECIOUS_STONES",
  SEMI_PRECIOUS_STONES = "SEMI_PRECIOUS_STONES",
  PORCELAIN = "PORCELAIN",
  GLASS = "GLASS",
  BRONZE = "BRONZE",
  MARBLE = "MARBLE",
  WOOD = "WOOD",
  STAINLESS_STEEL = "STAINLESS_STEEL",
  OTHER = "OTHER",
}

export enum UnitType {
  CM = "CM",
  INCH = "INCH",
}

export interface IAsset extends IUuidBase, IDateBase, ISearchable {
  imageUrl: string;

  offers?: Array<IOffer>;
  photos?: Array<IPhoto>;
  documents?: Array<IDocument>;
  provenance?: Array<IProvenance>;
  merchant?: IMerchant;
  token?: IToken;

  isCopyright: boolean;
  artworkCreatedAt: string | null;

  category: CategoryType;
  subject: SubjectType;
  style: StyleType;

  /** API returns string (bigint serialization); backend uses bigint */
  fractions: string | bigint;
  favorites: Array<IFavorite>;
  material: MaterialType;

  artistName: string;
  assetType: AssetType;
  assetStatus: AssetStatus;

  dimensions: IAssetDimensionsDto;
  heightOfArtwork: number;
  widthOfArtwork: number;
  depthOfArtwork: number;

  comment: string | null;
  seller: string | null;
  arUrl: string | null;
  agreementUrl: string | null;
}
