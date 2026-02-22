import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Root = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, -2),
  position: "relative",
}));
