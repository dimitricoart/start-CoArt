import { FC, useCallback } from "react";
import { CardMedia } from "@mui/material";

import type { IPhoto } from "@framework/types";

import { MAX_PHOTOS_HEIGHT, MAX_PHOTOS_WIDTH, MIN_PHOTOS_HEIGHT, MIN_PHOTOS_WIDTH } from "./styled";
import { sizeDecreaseCalc } from "../../../../../utils/sizeDecrease";

interface IAssetCardProps {
  photo: IPhoto;
  onPreview?: (imageUrl: string) => void;
}

export const PhotoCard: FC<IAssetCardProps> = props => {
  const { photo, onPreview } = props;

  const handleClick = useCallback(() => {
    if (onPreview) {
      onPreview(photo.imageUrl);
    }
  }, [onPreview, photo.imageUrl]);

  return (
    <CardMedia
      onClick={handleClick}
      sx={theme => ({
        width: sizeDecreaseCalc(MAX_PHOTOS_WIDTH, MIN_PHOTOS_WIDTH),
        height: sizeDecreaseCalc(MAX_PHOTOS_HEIGHT, MIN_PHOTOS_HEIGHT),
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        cursor: onPreview ? "pointer" : "default",
        backgroundSize: "contain",
      })}
      image={photo.imageUrl}
    />
  );
};
