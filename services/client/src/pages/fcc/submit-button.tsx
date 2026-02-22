import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { IRenderFormButtonsProps } from "@framework/mui-form";

import { Button } from "../../components/buttons";

interface IFccSubmitProps extends IRenderFormButtonsProps {
  hasScrolledToEnd: boolean;
  isPdfNotSupported: boolean;
}

export const FccSubmit: FC<IFccSubmitProps> = props => {
  const { isLoading, disabled: formDisabled, hasScrolledToEnd, isPdfNotSupported } = props;

  const disabled = isPdfNotSupported ? formDisabled : !hasScrolledToEnd || formDisabled;

  return (
    <Button
      isLoading={isLoading}
      sx={{ alignSelf: "center" }}
      variant="contained"
      type="submit"
      color="primary"
      disabled={disabled}
      data-testid="FCCSubmitButton"
    >
      <FormattedMessage id="form.buttons.confirm" />
    </Button>
  );
};
