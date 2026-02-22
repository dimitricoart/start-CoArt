import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useFormContext } from "react-hook-form";

import { IRenderFormButtonsProps } from "@framework/mui-form";

import { Button } from "../../../components/buttons";

export const CreateWalletSubmitButton: FC<IRenderFormButtonsProps> = ({ isLoading }) => {
  const {
    formState: { isDirty },
    watch,
  } = useFormContext();

  const agreeValues = watch(["isConfirmed"]);

  const disabled = !isDirty || agreeValues.some(v => !v);

  return (
    <Button
      sx={theme => ({ marginTop: theme.spacing(5) })}
      variant="contained"
      color="primary"
      type="submit"
      isLoading={isLoading}
      disabled={disabled}
    >
      <FormattedMessage id="pages.dashboard.wallet.create" />
    </Button>
  );
};
