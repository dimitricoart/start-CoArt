import { alpha, Box, styled } from "@mui/material";

import { sizeDecreaseCalc } from "../../../../../utils/sizeDecrease";

export const MAX_PHOTOS_HEIGHT = 550;
export const MIN_PHOTOS_HEIGHT = 330;
export const MAX_PHOTOS_WIDTH = 560;
export const MIN_PHOTOS_WIDTH = 340;

export const StyledPhotosListRoot = styled(Box)(({ theme }) => ({
  background: "transparent",
  minHeight: sizeDecreaseCalc(MAX_PHOTOS_HEIGHT, MIN_PHOTOS_HEIGHT),
  width: sizeDecreaseCalc(MAX_PHOTOS_WIDTH, MIN_PHOTOS_WIDTH),

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },

  "& .react-multi-carousel-dot-list": {
    "& .react-multi-carousel-dot > button": {
      width: "9px",
      height: "9px",
      border: "none",
      background: theme.palette.custom.lightGrey,
    },

    "& .react-multi-carousel-dot--active > button": {
      background: theme.palette.common.white,
    },
  },

  "& .react-multiple-carousel__arrow": {
    background: "none",

    "&:hover": {
      background: "none",
    },

    "&:active": {
      border: "none",
    },
  },

  "& .react-multiple-carousel__arrow--left": {
    left: "calc(2% + 1px)",
  },

  "& .react-multiple-carousel__arrow--right": {
    right: "calc(2% + 1px)",
  },

  "& .react-multi-carousel-list": {
    position: "relative",
    height: "100%",

    "& .MuiIconButton-root": {
      background: alpha(theme.palette.custom.grey["100"], 0.7),
    },

    "& .react-multi-carousel-item": {
      width: "100%",
    },
  },
}));
