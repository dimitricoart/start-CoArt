import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFooterRoot = styled("footer")(({ theme }) => ({
  width: "100%",
  background: theme.palette.custom.bgFooter,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledWrapper = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  maxWidth: 1920,
  borderRadius: "16px 16px 0 0",
  padding: theme.spacing(8.75, 8.75, 3, 8.75),
  width: "100%",
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(7, 5, 2),
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    padding: theme.spacing(5, 3, 2),
  },
}));

export const StyledCopyrightWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },

  "& .MuiTypography-ralewayRegular": {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
    },
  },
}));
