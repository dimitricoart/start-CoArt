import { styled } from "@mui/material";

import { sizeDecreaseCalc } from "../../utils/sizeDecrease";

export const StyledMain = styled("main")(() => ({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

export const StyledCardsBlockRoot = styled("section")(({ theme }) => ({
  width: "85%",
  background: "transparent",
  paddingInline: theme.spacing(8.5),
  paddingBottom: "125px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "center",

  [theme.breakpoints.down("lg")]: {
    width: "100%",
    paddingInline: theme.spacing(4),
  },

  [theme.breakpoints.down("md")]: {
    paddingInline: theme.spacing(2),
  },

  "& .MuiTypography-body1": {
    ...theme.typography.ralewayRegular,
    fontSize: sizeDecreaseCalc(58, 27, "px"),
    lineHeight: "normal",
    textAlign: "center",

    "& .ShowroomTop-ItalicBoldText": {
      ...theme.typography.playfairBoldItalic,
      fontSize: sizeDecreaseCalc(58, 27, "px"),
    },
  },

  "& .MuiCardContent-root .MuiTypography-root": {
    textAlign: "left",
  },
}));
