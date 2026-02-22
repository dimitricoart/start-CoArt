import { Button, Menu } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledMenu = styled(Menu)(({ theme }) => ({
  marginTop: theme.spacing(1),
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(2.25),
  },
})) as typeof Menu;

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  borderColor: theme.palette.common.white,
})) as typeof Button;
