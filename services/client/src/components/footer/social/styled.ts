import { Box, Link, SvgIcon } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(3),
})) as typeof Box;

export const StyledLogo = styled(SvgIcon)(({ theme }) => ({
  fill: "#000000",
  "&:hover": {
    fill: theme.palette.primary.main,
  },
})) as any;

export const StyledLink = styled(Link)(() => ({
  display: "flex",
  alignItems: "center",
  width: 30,
  height: 30,
})) as typeof Link;
