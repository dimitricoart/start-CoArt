import { CSSProperties } from "react";

import { MuiAutocomplete } from "./theme-components";

export interface IThemeProviderProps {
  darkPalette: object;
  lightPalette: object;
  options: object;
}

type OrangePaletteKeys = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
type WhitePaletteKeys = "100" | "200" | "300" | "400" | "500" | "600" | "700";
type GreyPaletteKeys = "100" | "200" | "300" | "400" | "500";
type TypographyPaletteKeys = "black" | "semiBlack" | "grey" | "semiGrey" | "success";
type ChipPaletteKeys = "approved" | "pending" | "declined" | "rejected" | "finalized";
type AlertPaletteKeys = "error" | "warning";

interface IPaletteTokens {
  orange: Record<OrangePaletteKeys, string>;
  white: Record<WhitePaletteKeys, string>;
  grey: Record<GreyPaletteKeys, string>;
  typography: Record<TypographyPaletteKeys, string>;
  chip: Record<ChipPaletteKeys, string>;
  alert: Record<AlertPaletteKeys, string>;
  bgFooter: string;
  info: string;
  lightGrey: string;
  error: string;
}

const paletteTokens: IPaletteTokens = {
  orange: {
    "100": "#F1C37F",
    "200": "#F4C275",
    "300": "#FFBC63",
    "400": "#EAAA5B",
    "500": "#EB8017",
    "600": "#D36E19",
    "700": "#D57526",
    "800": "#F37800",
    "900": "#D2740E",
  },
  white: {
    "100": "#FFFFFF",
    "200": "#F7F7F7",
    "300": "#EEEEEE",
    "400": "#EFEFEF",
    "500": "#E0E0E0",
    "600": "#D8D8D8",
    "700": "#B6B6B6",
  },
  grey: {
    "100": "#BCBCBC",
    "200": "#B3B3B3",
    "300": "#A0A0A0",
    "400": "#9C9C9C",
    "500": "#7B7B7B",
  },
  typography: {
    black: "#2B2B2B",
    semiBlack: "#3C3C3C",
    grey: "#84868F",
    semiGrey: "#909090",
    success: "#00A63E",
  },
  alert: {
    error: "#FF0000",
    warning: "#D9D31A",
  },
  chip: {
    approved: "#20A716",
    pending: "#D68A27",
    declined: "#d81616",
    rejected: "#AD1111",
    finalized: "#20A716",
  },
  bgFooter: "#171717",
  info: "#0072FF",
  lightGrey: "#BCBCBC",
  error: "#E23636",
};

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Palette {
    custom: CustomPaletteColor;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface PaletteOptions {
    custom: CustomPaletteColor;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomPaletteColor {
    bgFooter: string;
    strokeOrange: string;
    gradientOrange: string;
    borderGradientOrange: string;
    orange: (typeof paletteTokens)["orange"];
    white: (typeof paletteTokens)["white"];
    grey: (typeof paletteTokens)["grey"];
    typography: (typeof paletteTokens)["typography"];
    chip: (typeof paletteTokens)["chip"];
    alert: (typeof paletteTokens)["alert"];
    info: string;
    lightGrey: string;
    error: string;
  }
}

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface TypographyVariants {
    playfairSemibold?: CSSProperties;
    playfairBoldItalic?: CSSProperties;
    playfairRegular?: CSSProperties;
    ralewayRegular?: CSSProperties;
    ralewayMedium?: CSSProperties;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface TypographyVariantsOptions {
    playfairSemibold?: CSSProperties;
    playfairBoldItalic?: CSSProperties;
    playfairRegular?: CSSProperties;
    ralewayRegular?: CSSProperties;
    ralewayMedium?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface TypographyPropsVariantOverrides {
    playfairSemibold?: true;
    playfairBoldItalic?: true;
    playfairRegular?: true;
    ralewayRegular?: true;
    ralewayMedium?: true;
  }
}

const customPalette = {
  custom: {
    bgFooter: paletteTokens.bgFooter,
    strokeOrange: paletteTokens.orange["300"],
    gradientOrange: `linear-gradient(90deg, ${paletteTokens.orange["200"]} 0%, ${paletteTokens.orange["600"]} 100%)`,
    borderGradientOrange: `linear-gradient(to right, ${paletteTokens.orange["700"]} , ${paletteTokens.orange["100"]})`,
    orange: paletteTokens.orange,
    white: paletteTokens.white,
    grey: paletteTokens.grey,
    typography: paletteTokens.typography,
    chip: paletteTokens.chip,
    alert: paletteTokens.alert,
    info: paletteTokens.info,
    lightGrey: paletteTokens.lightGrey,
    error: paletteTokens.error,
  },
};

export const themeProps: IThemeProviderProps = {
  darkPalette: customPalette,
  lightPalette: customPalette,
  options: {
    typography: {
      fontFamily: "Poppins, sans-serif",
      playfairBoldItalic: {
        fontFamily: "Playfair Display",
        fontSize: "58px",
        fontWeight: 700,
        lineHeight: "auto",
        fontStyle: "italic",
      },
      playfairSemibold: {
        fontFamily: "Playfair Display",
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: "auto",
      },
      playfairRegular: {
        fontFamily: "Playfair Display",
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "auto",
      },
      ralewayRegular: {
        fontFamily: "Raleway, sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "20px",
      },
      ralewayMedium: {
        fontFamily: "Raleway, sans-serif",
        fontSize: "24px",
        fontWeight: 500,
        lineHeight: "34px",
      },
    },
    components: {
      MuiAutocomplete,
    },
  },
};
