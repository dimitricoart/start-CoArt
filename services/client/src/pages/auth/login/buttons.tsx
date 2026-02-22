import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router";
import { Grid, Button as MuiButton } from "@mui/material";

import { IRenderFormButtonsProps } from "@framework/mui-form";

import { ROUTES } from "../../../routes/routes";
import { Button } from "../../../components/buttons";
import { StyledButtonsToolbar } from "../styled";

export const LoginButtons: FC<IRenderFormButtonsProps> = ({ isLoading }) => {
  return (
    <StyledButtonsToolbar>
      <Grid size={12} display="flex" alignItems="center" justifyContent="center" gap={2.5} flexWrap="wrap">
        <Button
          isLoading={isLoading}
          variant="contained"
          type="submit"
          color="primary"
          data-testid="LoginWithEmailButton"
        >
          <FormattedMessage id="form.buttons.login" />
        </Button>
        <Button
          customColor="white"
          variant="contained"
          type="button"
          to={ROUTES.REGISTRATION}
          component={RouterLink}
          data-testid="SignupWithEmailButton"
        >
          <FormattedMessage id="form.buttons.signup" />
        </Button>
      </Grid>
      <MuiButton
        className="Login-ForgotPasswordButton"
        variant="text"
        type="button"
        to={ROUTES.FORGOT_PASSWORD}
        component={RouterLink}
        data-testid="ForgotEmailButton"
      >
        <FormattedMessage id="form.buttons.forgot" />
      </MuiButton>
    </StyledButtonsToolbar>
  );
};
