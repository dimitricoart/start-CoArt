import { IconButton, styled } from "@mui/material";

export const StyledIconMobileButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  background: theme.palette.custom.white["100"],

  "&:hover": {
    background: theme.palette.custom.white["200"],
  },
}));
