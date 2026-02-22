import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { IRenderFormButtonsProps } from "@framework/mui-form";

import { Button } from "../../components/buttons";
import { StyledButtonsToolbar } from "../auth/styled";

interface IPaymentSubmitProps extends IRenderFormButtonsProps {
  hasScrolledToEnd: boolean;
  isPdfNotSupported: boolean;
}

export const PaymentSubmit: FC<IPaymentSubmitProps> = props => {
  const { isLoading, disabled: formDisabled, hasScrolledToEnd, isPdfNotSupported } = props;

  const disabled = isPdfNotSupported ? formDisabled : !hasScrolledToEnd || formDisabled;

  return (
    <StyledButtonsToolbar sx={{ flexDirection: "row" }}>
      <Button
        isLoading={isLoading}
        disabled={disabled}
        customColor="white"
        variant="contained"
        color="primary"
        data-testid="PaywallPaykillaButton"
        data-method="paykilla"
        type="submit"
      >
        <FormattedMessage id="pages.paywall.paykilla" />
      </Button>
      <Button
        isLoading={isLoading}
        disabled={disabled}
        customColor="white"
        variant="contained"
        color="primary"
        data-testid="PaywallStripeButton"
        data-method="stripe"
        type="submit"
      >
        <FormattedMessage id="pages.paywall.stripe" />
      </Button>
    </StyledButtonsToolbar>
  );
};
