import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { ButtonToolbar } from "../components/button-toolbar";

interface IFormButtonsProps {
  visible?: boolean;
  submit?: string;
  isLoading: boolean;
}

export const FormButtons: FC<IFormButtonsProps> = props => {
  const { visible = true, submit = "submit", isLoading } = props;

  const {
    formState: { isValid },
  } = useFormContext();

  const disabled = isLoading || !isValid;

  if (!visible) {
    return null;
  }

  return (
    <ButtonToolbar>
      <Button variant="contained" color="primary" type="submit" disabled={disabled} data-testid="FormSubmitButton">
        <FormattedMessage id={`form.buttons.${submit}`} />
      </Button>
    </ButtonToolbar>
  );
};
