import { Box, styled } from "@mui/material";

export const StyledEmptyRoot = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: 480,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.spacing(3.5),
  backgroundColor: theme.palette.custom.white["100"],
  backgroundImage: "url('/assets/empty_bg.png')",
  backgroundPosition: "bottom",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
}));
