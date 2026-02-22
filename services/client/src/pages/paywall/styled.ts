import { Stack, styled } from "@mui/material";

export const StyledFieldsBox = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
