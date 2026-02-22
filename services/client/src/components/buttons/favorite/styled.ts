import { alpha, IconButton, IconButtonProps, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton, { shouldForwardProp: prop => prop !== "$active" })<
  IconButtonProps & { $active: boolean }
>(({ theme, $active }) => ({
  padding: 0,
  "& .FavoriteIcon-path": {
    fill: $active ? theme.palette.custom.error : theme.palette.custom.white["600"],
  },

  "&:hover": {
    background: "none",

    "& .FavoriteIcon-path": {
      fill: theme.palette.custom.white["400"],
      stroke: alpha(theme.palette.custom.error, 0.8),
    },
  },
}));
