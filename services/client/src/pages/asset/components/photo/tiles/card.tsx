import { FC } from "react";
import { CardMedia } from "@mui/material";

import { openUrlOnClick } from "../../../../../libs/open-url-on-click";
import type { IPhoto } from "@framework/types";

import { MAX_PHOTOS_HEIGHT, MAX_PHOTOS_WIDTH, MIN_PHOTOS_HEIGHT, MIN_PHOTOS_WIDTH } from "./styled";
import { sizeDecreaseCalc } from "../../../../../utils/sizeDecrease";

interface IAssetCardProps {
  photo: IPhoto;
}

export const PhotoCard: FC<IAssetCardProps> = props => {
  const { photo } = props;

  return (
    <CardMedia
      onClick={openUrlOnClick(photo.imageUrl)}
      sx={theme => ({
        width: sizeDecreaseCalc(MAX_PHOTOS_WIDTH, MIN_PHOTOS_WIDTH),
        height: sizeDecreaseCalc(MAX_PHOTOS_HEIGHT, MIN_PHOTOS_HEIGHT),
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        cursor: "pointer",
        backgroundSize: "contain",
      })}
      image={photo.imageUrl}
    />
  );
};
