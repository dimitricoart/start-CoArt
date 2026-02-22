import { Box, Grid, styled } from "@mui/material";

import { formStyles } from "../../components/styled";

export const StyledAuthRoot = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: 980,
  margin: "0 auto",
  background: theme.palette.common.white,
  borderRadius: theme.spacing(3.75),
  padding: theme.spacing(7),
  marginBottom: 180,
  marginTop: 25,

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(7, 4),
  },

  "& .MuiTypography-body1": {
    ...theme.typography.playfairBoldItalic,
    fontSize: 45,
    color: theme.palette.custom.typography.black,
    textAlign: "center",
  },

  ...formStyles(theme),
}));

export const StyledButtonsToolbar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: theme.spacing(2.5),
  marginTop: theme.spacing(1.5),

  "& .Login-ForgotPasswordButton": {
    ...theme.typography.ralewayMedium,
    color: theme.palette.custom.grey["200"],
    borderBottom: `1px dashed ${theme.palette.custom.grey["200"]}`,
    padding: 0,
    fontSize: 18,
    background: "none",
    textTransform: "none",
    marginTop: 15,

    "&:hover": {
      background: "none",
    },
  },
}));
