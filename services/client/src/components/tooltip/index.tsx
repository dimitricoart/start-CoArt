import { FC, ReactNode } from "react";
import { styled, Tooltip, TooltipProps } from "@mui/material";
import { InfoOutline } from "@mui/icons-material";

interface IInfoTooltip extends Omit<TooltipProps, "children"> {
  children?: ReactNode;
}

const StyledInfoIcon = styled(InfoOutline)(({ theme }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
  path: {
    fill: theme.palette.custom.grey["300"],
  },
}));

export const InfoTooltip: FC<IInfoTooltip> = props => {
  const { ...rest } = props;
  return <Tooltip {...rest}>{<StyledInfoIcon />}</Tooltip>;
};
