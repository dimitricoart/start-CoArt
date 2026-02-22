import { Grid, styled } from "@mui/material";

export const StyledPageHeaderRoot = styled(Grid)(() => ({
  alignItems: "center",
  justifyContent: "space-between",
  mb: 3,
  mt: 2,

  "& .PageHeader-Title": {},
  "& .PageHeader-ButtonToolbar": {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
