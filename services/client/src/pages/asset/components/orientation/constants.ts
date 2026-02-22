import { AssetOrientation } from "@framework/types";

export const orientationDimensions: Record<AssetOrientation, Record<string, number>> = {
  [AssetOrientation.HORIZONTAL]: {
    width: 42,
    height: 25,
  },
  [AssetOrientation.VERTICAL]: {
    width: 25,
    height: 36,
  },
  [AssetOrientation.SQUARE]: {
    width: 25,
    height: 25,
  },
};

export const orientations: Array<AssetOrientation> = Object.values(AssetOrientation);
