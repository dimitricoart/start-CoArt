import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

interface IPageLoadingProps {
  pageWidth: number;
}

export const PageLoading: FC<IPageLoadingProps> = ({ pageWidth }) => {
  return (
    <Box
      sx={{
        width: pageWidth,
        height: pageWidth * 1.414,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size="small" />
    </Box>
  );
};
