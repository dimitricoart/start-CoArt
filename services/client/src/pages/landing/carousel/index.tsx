import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

import { ProgressOverlay } from "../../../components/page-layout";

import { MultiCarousel } from "./multi-carousel";
import { IBanner } from "./interface";
import { Banner } from "./banner";
import { StyledCarouselRoot } from "./styled";
import { BannerContent } from "./banner/content";

const banners: Array<IBanner> = [
  {
    title: "pages.landing.carousel.01.title",
    description: "pages.landing.carousel.01.description",
    imageUrl: "https://storage.googleapis.com/coart-statics/hero/faberge_egg.jpg",
  },
];

export const Carousel: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLg = useMediaQuery(theme => theme.breakpoints.down("lg"));

  useEffect(() => {
    void setIsLoading(false);
  }, []);

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <StyledCarouselRoot>
      {isLg && <BannerContent banner={banners[0]} />}

      <ProgressOverlay isLoading={isLoading}>
        <MultiCarousel banners={banners} component={Banner} />
      </ProgressOverlay>
    </StyledCarouselRoot>
  );
};
