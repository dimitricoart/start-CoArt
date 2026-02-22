import React from "react";
import { ChipProps as MuiChipProps } from "@mui/material";

import { ChipStatus, StyledChip } from "./styled";

export { ChipStatus };

interface IChipProps extends MuiChipProps {
  status?: ChipStatus;
}

export const Chip = ({ status = "pending", ...props }: IChipProps) => {
  return <StyledChip $status={status} {...props} />;
};
