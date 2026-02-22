import { AlertTitle, AlertProps as MuiAlertProps } from "@mui/material";
import { FC, ReactNode } from "react";

import { StyledAlert } from "./styled";

interface IAlertProps extends Omit<MuiAlertProps, "title"> {
  title: ReactNode;
}

export const Alert: FC<IAlertProps> = ({ title, children, icon: _icon, ...rest }) => {
  return (
    <StyledAlert icon={false} {...rest}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </StyledAlert>
  );
};
