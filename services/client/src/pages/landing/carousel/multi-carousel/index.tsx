import { ComponentType, FC } from "react";
import { IconButton, Theme, useMediaQuery, useTheme } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { IBanner } from "../interface";
import { Root } from "./styled";
import { CarouselLeftArrowIcon, CarouselRightArrowIcon, Resolutions } from "../../../../shared";

declare interface IMultiCarouselHierarchyProps {
  banners: Array<IBanner>;
  component: ComponentType<{ banner: IBanner }>;
}

export const MultiCarousel: FC<IMultiCarouselHierarchyProps> = props => {
  const { banners, component: Component } = props;

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
    <Root>
      <Carousel
        infinite
        showDots
        renderDotsOutside
        // autoPlay={deviceType !== Resolutions.MOBILE}
        deviceType={deviceType}
        responsive={responsive}
        centerMode={false}
        partialVisible={false}
        customLeftArrow={
          <IconButton
            sx={{ "&::before": { content: '""', display: "none !important" } }}
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left "
          >
            <CarouselLeftArrowIcon />
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
        {banners.map((banner, i) => (
          <Component key={i} banner={banner} />
        ))}
      </Carousel>
    </Root>
  );
};
