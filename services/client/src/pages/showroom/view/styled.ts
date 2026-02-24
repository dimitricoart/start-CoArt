import { alpha, Box, styled } from "@mui/material";

import { CONTENT_WIDTH } from "../../../shared";
import { sizeDecreaseCalc } from "../../../utils/sizeDecrease";

export const StyledMainRoot = styled("main")(({ theme }) => ({
  width: CONTENT_WIDTH,
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    margin: 0,
  },
  paddingBottom: theme.spacing(4),
}));

const MIN_SHOWROOM_BLOCK_HEIGHT = 575;
const SHOWROOM_LOGO_SIZE = 325;
const MOBILE_SHOWROOM_LOGO_SIZE = 155;

export const StyledShowroomBlock = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: MIN_SHOWROOM_BLOCK_HEIGHT,
  display: "flex",
  flexDirection: "column",
  borderRadius: 60,
  overflow: "hidden",

  [theme.breakpoints.down("md")]: {
    borderRadius: 0,
    minHeight: 0,
  },
}));

export const StyledImage = styled(Box)(({ theme }) => ({
  maxHeight: MIN_SHOWROOM_BLOCK_HEIGHT / 2,
  display: "block",
  objectFit: "cover",
  objectPosition: "center left",

  [theme.breakpoints.down("md")]: {
    minHeight: MIN_SHOWROOM_BLOCK_HEIGHT / 2,
    objectPosition: "center",
  },
})) as typeof Box;

export const StyledLogoImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: -50,
  left: 25,
  borderRadius: 60,
  width: SHOWROOM_LOGO_SIZE,
  height: SHOWROOM_LOGO_SIZE,
  objectFit: "cover",

  [theme.breakpoints.down("md")]: {
    width: MOBILE_SHOWROOM_LOGO_SIZE,
    height: MOBILE_SHOWROOM_LOGO_SIZE,
    borderRadius: 25,
    top: -150,
    left: "50%",
    transform: "translate(-50%, 50%)",
  },
})) as typeof Box;

export const StyledShowroomContent = styled(Box)(({ theme }) => ({
  minHeight: MIN_SHOWROOM_BLOCK_HEIGHT / 2,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  background: alpha(theme.palette.custom.white["100"], 0.4),
  padding: theme.spacing(3.25, 3, 3.25, 0),
  paddingLeft: `${SHOWROOM_LOGO_SIZE + 82}px`,

  [theme.breakpoints.down("md")]: {
    background: "none",
    padding: theme.spacing(0, 3, 0, 3),
    paddingTop: `${MOBILE_SHOWROOM_LOGO_SIZE - 75}px`,
    textAlign: "center",
    alignItems: "center",
  },

  "& .editor-input": {
    ...theme.typography.ralewayRegular,
    fontSize: sizeDecreaseCalc(22, 15),
    lineHeight: sizeDecreaseCalc(34, 25, "px"),
  },
  "& .MuiTypography-root": {
    ...theme.typography.ralewayRegular,
    fontSize: sizeDecreaseCalc(16, 14),
    lineHeight: 1.5,
  },
})) as typeof Box;
