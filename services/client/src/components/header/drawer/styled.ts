import { Box, styled, SwipeableDrawer } from "@mui/material";

export const StyledSwipeableDrawer = styled(SwipeableDrawer)(() => ({
  "& .MuiPaper-root": {
    width: "80%",
  },
}));

export const StyledMenuWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: "100%",
  height: "100vh",
  padding: theme.spacing(3),
}));

export const StyledMenuHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: theme.spacing(0.9),

  svg: {
    width: 27,
    height: 27,
  },
}));

export const StyledContentBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: theme.spacing(3.5),

  "& .MuiMenuItem-root": {
    width: "100%",

    "&.Mui-selected": {
      background: "none",
      color: theme.palette.custom.info,
    },

    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.custom.white["400"]}`,
    },

    "&:first-of-type": {
      borderTop: `1px solid ${theme.palette.custom.white["400"]}`,
    },
  },
}));
