import { Box, styled } from "@mui/material";
import { JSX } from "react";

import { AssetOrientation } from "@framework/types";

import { orientationDimensions } from "./constants";

interface IBpProps {
  $orientation: AssetOrientation;
}

export const BpIcon = styled(Box, { shouldForwardProp: prop => prop !== "$orientation" })<
  JSX.IntrinsicElements["span"] & IBpProps
>(({ theme, $orientation }) => ({
  width: orientationDimensions[$orientation].width,
  height: orientationDimensions[$orientation].height,
  backgroundColor: theme.palette.custom.white["400"],
  border: `1px solid ${theme.palette.custom.white["700"]}`,
  borderRadius: theme.spacing(0.75),
  marginRight: theme.spacing(1.25),
}));
