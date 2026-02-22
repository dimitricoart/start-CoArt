import { Box, styled } from "@mui/material";

export const StyledImagesBox = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(10),

  "& .MerchantForm-AvatarImageInput": {
    position: "absolute",
    left: 72,
    bottom: -34,
  },
}));
