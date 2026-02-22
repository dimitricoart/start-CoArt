import { FC } from "react";
import { BoxProps } from "@mui/material";

import { LoadingDot, LoadingDotsContainer } from "./styled";

export const LoadingDots: FC<BoxProps> = props => {
  return (
    <LoadingDotsContainer component="div" {...props}>
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
      <LoadingDot />
    </LoadingDotsContainer>
  );
};
