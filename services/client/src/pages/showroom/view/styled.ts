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

export const StyledShowroomContent = styled(Box)(({ theme }) => ({
  minHeight: MIN_SHOWROOM_BLOCK_HEIGHT / 2,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  background: alpha(theme.palette.custom.white["100"], 0.4),
  padding: theme.spacing(3.25, 3, 3.25, 0),
  paddingLeft: `${SHOWROOM_LOGO_SIZE + 82}px`, // 94 = leftBlockPadding + SHOWROOM_LOGO_SIZE + 56px

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
})) as typeof Box;
