import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(4),
  maxWidth: 980,
  margin: "0 auto",
  background: theme.palette.common.white,
  borderRadius: theme.spacing(3.75),
  padding: theme.spacing(7),
  marginBottom: 180,
  marginTop: 50,

  [theme.breakpoints.down("md")]: {
    maxWidth: 680,
  },

  "& h2.MuiTypography-root": {
    ...theme.typography.playfairBoldItalic,
    fontSize: 45,
  },
}));
