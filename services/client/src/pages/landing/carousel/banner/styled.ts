import { alpha, Box, BoxProps, Grid, styled } from "@mui/material";

import { sizeDecreaseCalc } from "../../../../utils/sizeDecrease";

export const StyledBannerRoot = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  margin: "auto",
}));

export const StyledBannerContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(3),
  flex: "1 0 50%",
  width: "50%",
  boxSizing: "border-box",
  backgroundColor: alpha(theme.palette.common.white, 0.7),
  padding: "65px 24px 65px 24px",

  [theme.breakpoints.down("lg")]: {
    width: "100%",
    background: "none",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(6),
  },

  "& .MuiTypography-root": {
    width: "70%",

    [theme.breakpoints.down("lg")]: {
      textAlign: "center",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      textAlign: "center",
    },
  },

  "& .Banner-ContentTitle": {
    ...theme.typography.ralewayRegular,
    margin: theme.spacing(0, 0, 0, 4),
    fontSize: sizeDecreaseCalc(58, 27, "px"),
    lineHeight: 1,

    [theme.breakpoints.down("lg")]: {
      margin: 0,
    },

    "& .Banner-ItalicBoldText": {
      ...theme.typography.playfairBoldItalic,
      fontSize: sizeDecreaseCalc(58, 27, "px"),
    },
  },

  "& .Banner-ContentDescription": {
    ...theme.typography.ralewayRegular,
    margin: theme.spacing(0, 0, 0, 4),
    fontSize: sizeDecreaseCalc(22, 15, "px"),
    lineHeight: 1.5,

    [theme.breakpoints.down("lg")]: {
      margin: 0,
    },

    "& .Banner-ItalicBoldText": {
      ...theme.typography.playfairBoldItalic,
      fontSize: "22px",
    },
  },
}));

export const StyledBannerContentButtons = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.up("xl")]: {
    width: "70%",
  },
  [theme.breakpoints.down("xl")]: {
    width: "95%",
  },
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    width: "40%",
  },
  [theme.breakpoints.down("md")]: {
    width: "60%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },

  "& .MuiButtonBase-root": {
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(2.5),
    },
    [theme.breakpoints.down("lg")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

export const StyledBannerImage = styled(Box, { shouldForwardProp: prop => prop !== "$image" })<
  BoxProps & { $image: string }
>(({ theme, $image }) => ({
  width: "50%",
  minHeight: "600px",
  flex: "1 0 50%",
  display: "block",
  backgroundImage: `url(${$image})`,
  backgroundPosition: "right center",
  backgroundSize: "cover",

  [theme.breakpoints.down("lg")]: {
    width: "100%",
    minHeight: "465px",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    minHeight: "265",
  },
}));
