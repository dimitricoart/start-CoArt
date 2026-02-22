import { ComponentProps, FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import { Button, IButtonOwnProps } from "../simple";

interface IPasswordButtonsProps extends IButtonOwnProps {
  textId: ComponentProps<typeof FormattedMessage>["id"];
  values?: ComponentProps<typeof FormattedMessage>["values"];
}

export const PasswordButton: FC<IPasswordButtonsProps> = props => {
  const { textId, values, isLoading, ...restProps } = props;
  const {
    formState: { isDirty },
  } = useFormContext();

  return (
    <Button
      isLoading={isLoading}
      variant="contained"
      type="submit"
      color="primary"
      disabled={!isDirty}
      data-testid="ForgotPasswordButton"
      {...restProps}
    >
      <FormattedMessage id={textId} values={values} />
    </Button>
  );
};
