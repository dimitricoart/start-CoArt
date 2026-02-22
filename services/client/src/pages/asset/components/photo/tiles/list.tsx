import { FC } from "react";
import { IconButton, Theme, useMediaQuery, useTheme } from "@mui/material";
import Carousel from "react-multi-carousel";

import type { IPhoto } from "@framework/types";

import { CarouselRightArrowIcon, Resolutions } from "../../../../../shared";
import { PhotoCard } from "./card";
import { StyledPhotosListRoot } from "./styled";

interface IAssetListProps {
  photos: Array<IPhoto>;
}

export const PhotosList: FC<IAssetListProps> = props => {
  const { photos } = props;

  const theme = useTheme();

  const responsive = {
    [Resolutions.DESKTOP]: {
      breakpoint: {
        max: 3000,
        min: theme.breakpoints.values.md,
      },
      items: 1,
    },
    [Resolutions.TABLET]: {
      breakpoint: {
        max: theme.breakpoints.values.md,
        min: theme.breakpoints.values.sm,
      },
      items: 1,
    },
    [Resolutions.MOBILE]: {
      breakpoint: {
        max: theme.breakpoints.values.sm,
        min: 0,
      },
      items: 1,
    },
  };

  const isSmallScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down("md"));

  const deviceType = isSmallScreen ? Resolutions.MOBILE : isMediumScreen ? Resolutions.TABLET : Resolutions.DESKTOP;

  return (
    <StyledPhotosListRoot>
      <Carousel
        infinite
        showDots
        deviceType={deviceType}
        responsive={responsive}
        centerMode={false}
        partialVisible={false}
        customLeftArrow={
          <IconButton
            sx={{ "&::before": { content: '""', display: "none !important" }, transform: "rotate(180deg)" }}
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left "
          >
            <CarouselRightArrowIcon />
          </IconButton>
        }
        customRightArrow={
          <IconButton
            sx={{ "&::before": { content: '""', display: "none !important" } }}
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right "
          >
            <CarouselRightArrowIcon />
          </IconButton>
        }
      >
        {photos.map((photo, i) => (
          <PhotoCard key={i} photo={photo} />
        ))}
      </Carousel>
    </StyledPhotosListRoot>
  );
};
