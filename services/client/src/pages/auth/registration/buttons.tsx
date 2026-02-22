import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import { IRenderFormButtonsProps } from "@framework/mui-form";

import { Button } from "../../../components/buttons";

export const RegistrationButtons: FC<IRenderFormButtonsProps> = ({ isLoading }) => {
  const {
    formState: { isDirty },
    watch,
  } = useFormContext();

  const agreeValues = watch(["termsAgree"]);

  const disabled = !isDirty || agreeValues.some(v => !v);

  return (
    <Button
      isLoading={isLoading}
      sx={{ alignSelf: "flex-start" }}
      variant="contained"
      type="submit"
      color="primary"
      disabled={disabled}
      data-testid="SignUpWithEmailButton"
    >
      <FormattedMessage id="form.buttons.signup" />
    </Button>
  );
};
