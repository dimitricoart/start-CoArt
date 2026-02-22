import {
  DialogContent as MuiDialogContent,
  DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
} from "@mui/material";
import { ComponentProps, PropsWithChildren, ReactElement } from "react";
import { FormattedMessage } from "react-intl";

import { StyledDialog } from "./styled";

interface IDialogProps extends MuiDialogProps {
  message?: ComponentProps<typeof FormattedMessage>["id"];
  data?: ComponentProps<typeof FormattedMessage>["values"];
  action?: ReactElement | null;
}

export const Dialog = (props: PropsWithChildren<IDialogProps>) => {
  const { message = "dialogs.confirmation", data, action, children, ...restProps } = props;
  return (
    <StyledDialog {...restProps} fullWidth>
      <MuiDialogTitle>
        <FormattedMessage id={message} values={data} />
        {action}
      </MuiDialogTitle>
      <MuiDialogContent>{children}</MuiDialogContent>
    </StyledDialog>
  );
};
