import { AppBar, Box, BoxProps, Link, LinkProps, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

import { CONTENT_WIDTH } from "../../shared";
import { sizeDecreaseCalc } from "../../utils/sizeDecrease";

export const StyledLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  fontWeight: 500,
  fontSize: sizeDecreaseCalc(36, 22),
  display: "inline-flex",
  alignItems: "center",
  "&:hover": {
    textDecoration: "none",
  },
})) as typeof Link;

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "transparent",
  paddingBottom: theme.spacing(7),
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  width: CONTENT_WIDTH,
  minHeight: 60,
  padding: theme.spacing(7, 0, 0, 0),
  [theme.breakpoints.down("xl")]: {
    padding: theme.spacing(7, 0, 0, 0),
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3.75, 0, 0, 0),
    width: "95%",
  },
}));

export const StyledMenuTriggerRoot = styled(Box, {
  shouldForwardProp: prop => prop !== "$hasAvatar",
})<BoxProps & { $hasAvatar: boolean }>(({ theme, $hasAvatar }) => ({
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  position: "relative",
  boxSizing: "border-box",
  padding: theme.spacing(0.75, 4, 0.75, 0.75),
  border: "2px solid transparent",
  borderRadius: "200px",
  cursor: "pointer",

  [theme.breakpoints.up("md")]: {
    background: `linear-gradient(to right, ${theme.palette.custom.white["400"]}, ${theme.palette.custom.white["400"]}), ${theme.palette.custom.borderGradientOrange}`,
    backgroundClip: "padding-box, border-box",
    backgroundOrigin: "padding-box, border-box",
  },

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0.75),
    width: 48,
    height: 48,
    justifyContent: "center",
  },

  "&::before": {
    borderRadius: "200px",
    content: '""',
    backgroundImage: theme.palette.custom.borderGradientOrange,
    position: "absolute",
    zIndex: -1,
  },

  "& .MuiAvatar-root": {
    border: !$hasAvatar ? `1px solid ${theme.palette.custom.strokeOrange}` : "none",
    background: !$hasAvatar ? theme.palette.custom.gradientOrange : "none",
  },

  "& .MuiTypography-root": {
    color: theme.palette.custom.typography.black,
  },

  "&:active": {
    color: theme.palette.custom.typography.black,
  },
})) as any;
