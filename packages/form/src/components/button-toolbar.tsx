import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const ButtonToolbar: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>{children}</Box>
);
