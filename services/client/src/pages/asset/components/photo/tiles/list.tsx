import { FC, useCallback, useState } from "react";
import { Dialog, IconButton, Theme, useMediaQuery, useTheme } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
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
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const theme = useTheme();
  const openLightbox = useCallback((url: string) => setLightboxUrl(url), []);
  const closeLightbox = useCallback(() => setLightboxUrl(null), []);

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
          <PhotoCard key={i} photo={photo} onPreview={openLightbox} />
        ))}
      </Carousel>
      <Dialog
        open={!!lightboxUrl}
        onClose={closeLightbox}
        maxWidth={false}
        PaperProps={{
          sx: {
            maxWidth: "95vw",
            maxHeight: "95vh",
            overflow: "hidden",
            bgcolor: "transparent",
            boxShadow: "none",
          },
        }}
        slotProps={{ backdrop: { sx: { bgcolor: "rgba(0,0,0,0.85)" } } }}
      >
        {lightboxUrl ? (
          <>
            <IconButton
              aria-label="close"
              onClick={closeLightbox}
              sx={{ position: "absolute", right: 8, top: 8, color: "white", zIndex: 1 }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={lightboxUrl}
              alt=""
              style={{ maxWidth: "95vw", maxHeight: "95vh", objectFit: "contain" }}
              onClick={closeLightbox}
            />
          </>
        ) : null}
      </Dialog>
    </StyledPhotosListRoot>
  );
};
