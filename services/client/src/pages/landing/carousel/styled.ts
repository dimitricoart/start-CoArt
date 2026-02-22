import { Box, styled } from "@mui/material";

export const StyledCarouselRoot = styled(Box)(({ theme }) => ({
  background: "transparent",
  paddingInline: theme.spacing(8.5),
  paddingBottom: "110px",

  [theme.breakpoints.down("lg")]: {
    paddingInline: 0,
  },

  "& .react-multi-carousel-dot-list": {
    bottom: "-40px",

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
    borderRadius: "90px",

    [theme.breakpoints.down("lg")]: {
      borderRadius: 0,
    },

    "& .react-multi-carousel-item": {
      width: "100%",
    },
  },
}));
