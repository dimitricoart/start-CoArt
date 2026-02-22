import React from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink, useSearchParams } from "react-router";
import { Stack, Typography } from "@mui/material";

import { StyledAuthRoot } from "../../auth/styled";
import { SuccessIcon } from "../../../shared";
import { Button } from "../../../components/buttons";
import { ROUTES } from "../../../routes/routes";

export const StripeSuccess = () => {
  const [searchParams] = useSearchParams();

  const _sessionId = searchParams.get("session_id");

  return (
    <StyledAuthRoot container size={12} spacing={3.25} flexDirection="column">
      <Stack alignItems="center">
        <SuccessIcon />
        <Typography variant="playfairBoldItalic" textAlign="center" fontSize={45} color="custom.typography.success">
          <FormattedMessage id="pages.stripe.success.title" />
        </Typography>
      </Stack>
      <Typography
        variant="ralewayRegular"
        fontSize={16}
        lineHeight="24px"
        color="custom.typography.semiBlack"
        textAlign="center"
      >
        <FormattedMessage id="pages.stripe.success.description" />
      </Typography>
      <Button
        sx={theme => ({
          [theme.breakpoints.down("sm")]: {
            minWidth: "100%",
          },
        })}
        component={RouterLink}
        variant="contained"
        color="primary"
        data-testid="StripeSuccessButton"
        to={ROUTES.MAIN}
      >
        <FormattedMessage id="pages.stripe.success.continue" />
      </Button>
    </StyledAuthRoot>
  );
};
