import { FC, PropsWithChildren } from "react";
import { Box, CircularProgress } from "@mui/material";

export const ProgressOverlay: FC<PropsWithChildren<{ isLoading?: boolean }>> = ({ isLoading, children }) => {
  if (!isLoading) return <>{children}</>;
  return (
    <Box position="relative" minHeight={120}>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={1}
      >
        <CircularProgress />
      </Box>
      <Box sx={{ visibility: "hidden" }}>{children}</Box>
    </Box>
  );
};
