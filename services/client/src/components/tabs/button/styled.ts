import { styled, Tab as MuiTab, Tabs as MuiTabs, Box as MuiBox } from "@mui/material";

import { sizeDecreaseCalc } from "../../../utils/sizeDecrease";

export const StyledRoot = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
}));
export const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(3.75),
  },

  "& .MuiTabs-list": {
    gap: theme.spacing(3),

    [theme.breakpoints.down("md")]: {
      gap: theme.spacing(1.25),
    },
  },

  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

export const StyledTab = styled(MuiTab)(({ theme }) => ({
  ...theme.typography.playfairSemibold,
  fontSize: sizeDecreaseCalc(16, 12),
  color: theme.palette.custom.grey["100"],
  background: theme.palette.custom.white["100"],
  borderRadius: 200,
  textTransform: "none",
  alignItems: "center",
  gap: theme.spacing(0.5),
  paddingInline: theme.spacing(4.5),
  minHeight: 60,

  [theme.breakpoints.down("md")]: {
    minHeight: 0,
    paddingInline: theme.spacing(3),

    svg: {
      width: 12,
      height: 12,
    },
  },

  p: {
    margin: 0,
    display: "inline-block",
    borderBottom: `1px dashed ${theme.palette.custom.grey["100"]}`,
  },

  "&.Mui-selected": {
    p: {
      color: theme.palette.custom.info,
      borderBottom: `1px dashed ${theme.palette.custom.info}`,
    },
    svg: {
      display: "none",
    },
  },
}));
