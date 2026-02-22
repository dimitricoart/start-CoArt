import {
  Box,
  BoxProps,
  FormControl,
  FormControlProps,
  Grid,
  Skeleton,
  SkeletonProps,
  styled,
  Theme,
} from "@mui/material";
import { CSSProperties } from "react";

import { ImageInputMode } from "./types";

const AVATAR_IMAGE_SIZE = 165;
const BACKGROUND_IMAGE_HEIGHT = 250;

interface IStyledComponentMode {
  $mode: ImageInputMode;
}

const imageStylesByMode: Record<ImageInputMode, CSSProperties> = {
  avatar: {
    width: AVATAR_IMAGE_SIZE,
    height: AVATAR_IMAGE_SIZE,
  },
  background: {
    height: BACKGROUND_IMAGE_HEIGHT,
  },
};

export const StyledImage = styled(Box, { shouldForwardProp: prop => prop !== "$mode" })<
  BoxProps & IStyledComponentMode
>(({ theme, $mode }) => ({
  borderRadius: theme.spacing(1.25),
  overflow: "hidden",
  display: "block",
  objectFit: "cover",
  objectPosition: "center",
  WebkitUserDrag: "none",
  userDrag: "none",
  ...imageStylesByMode[$mode],
})) as any;

const optionsBlockStylesByMode = (theme: Theme): Record<ImageInputMode, CSSProperties> => ({
  avatar: {
    background: theme.palette.custom.white["300"],
  },
  background: {
    background: theme.palette.custom.white["300"],
  },
});

export const StyledOptionsBlock = styled(Box, { shouldForwardProp: prop => prop !== "$mode" })<
  BoxProps & IStyledComponentMode
>(({ theme, $mode }) => {
  const { background } = optionsBlockStylesByMode(theme)[$mode];
  return {
    minHeight: 40,
    minWidth: 40,
    boxSizing: "border-box",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1.25),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.75),
    background,

    "& .MuiIconButton-root": {
      padding: 0,

      "&:hover": {
        background: "none",
      },
    },

    "& .MuiCircularProgress-svg": {
      color: theme.palette.custom.white["100"],
    },
  };
});

const placeholderStylesByMode = (theme: Theme): Record<ImageInputMode, CSSProperties> => ({
  avatar: {
    width: AVATAR_IMAGE_SIZE,
    height: AVATAR_IMAGE_SIZE,
    background: theme.palette.custom.white["100"],
    backgroundColor: theme.palette.custom.white["200"],
    borderRadius: theme.spacing(1.25),
  },
  background: {
    width: "100%",
    height: BACKGROUND_IMAGE_HEIGHT,
    background: theme.palette.custom.white["100"],
    backgroundColor: theme.palette.custom.white["200"],
    borderRadius: theme.spacing(1.25),
  },
});

export const StyledPlaceholder = styled(Box, { shouldForwardProp: prop => prop !== "$mode" })<
  BoxProps & IStyledComponentMode
>(({ theme, $mode }) => {
  const { width, height, background, borderRadius } = placeholderStylesByMode(theme)[$mode];
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius,
    width,
    height,
    background,

    "&.MuiError": {
      border: `1px solid ${theme.palette.error.main}`,

      "& .MuiFormHelperText-root": {
        textAlign: "center",
      },
    },

    "& .MuiSvgIcon-root": {
      width: 60,
      height: 60,
      color: theme.palette.custom.grey["200"],
    },
  };
});

export const StylesBackgroundSkeleton = styled(Skeleton, { shouldForwardProp: prop => prop !== "$mode" })<
  SkeletonProps & IStyledComponentMode
>(({ theme, $mode }) => {
  const { width, height, backgroundColor } = placeholderStylesByMode(theme)[$mode];
  return {
    position: "relative",
    borderRadius: theme.spacing(1.25),
    width,
    height,
    backgroundColor,
  };
});

export const StyledFormControl = styled(FormControl, {
  shouldForwardProp: prop => prop !== "$mode",
})<FormControlProps & { $mode?: ImageInputMode }>(({ theme, $mode }) => ({
  width: $mode === "background" ? "100%" : "fit-content",
  position: "relative",
  boxSizing: "border-box",

  "& .MuiFormHelperText-root": {
    display: "flex",
    justifyContent: "flex-end",
    margin: 0,
  },

  "& .AssetForm-GalleryInput, .AssetForm-ImageInput": {
    cursor: "pointer",
  },

  "&.AssetForm-ImageInput": {
    marginTop: theme.spacing(4),
  },

  "& .MuiInputBase-root.MuiInput-root": {
    ...theme.typography.ralewayRegular,
    lineHeight: "24px",
  },
})) as any;

export const StyledGalleryItemRoot = styled(Grid)(({ theme }) => ({
  "& .MuiInputBase-root": {
    ...theme.typography.ralewayRegular,
    lineHeight: "24px",
    borderBottom: `1px solid ${theme.palette.custom.white["600"]}`,
    paddingBottom: "2px",
  },

  "& .MuiInputBase-root:hover": {
    borderBottomColor: theme.palette.custom.white["700"],
  },

  "& .MuiInputBase-root.Mui-focused": {
    borderBottomColor: theme.palette.custom.grey["300"],
  },

  "& .MuiInputBase-root.Mui-error": {
    borderBottomColor: theme.palette.custom.error,
  },
  "& .MuiInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: "none",
  },

  "& .MuiFormHelperText-root": {
    ...theme.typography.ralewayRegular,
  },
})) as typeof Grid;
