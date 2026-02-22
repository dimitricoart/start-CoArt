import { PropsWithChildren, ReactNode } from "react";
import { FormLabel, Grid, GridProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

interface IInputBoxPropsBase extends PropsWithChildren, GridProps {
  required?: boolean;
}

type TInputBoxProps =
  | (IInputBoxPropsBase & { labelId: string; label?: ReactNode })
  | (IInputBoxPropsBase & { label: ReactNode; labelId?: string });

export const InputBox = (props: TInputBoxProps) => {
  const { labelId, label, required, children, ...restProps } = props;
  return (
    <Grid className="InputBox-root" {...restProps}>
      <FormLabel required={required}>
        {typeof label !== "undefined" ? label : <FormattedMessage id={`form.labels.${labelId}`} />}
      </FormLabel>
      {children}
    </Grid>
  );
};
