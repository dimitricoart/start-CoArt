import { FC, PropsWithChildren, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { FormattedMessage, useIntl } from "react-intl";
import { Link as RouterLink } from "react-router";

import { useUser } from "../../../libs/providers/user-provider";
import { CheckboxInput, PasswordInput, TextInput } from "../../../components/inputs";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { PageHeader } from "../../../components/page-header";
import { InputBox } from "../../../components/input-box";
import { StyledAuthRoot } from "../styled";
import { RegistrationButtons } from "./buttons";
import { ROUTES } from "../../../routes/routes";

export const Registration: FC<PropsWithChildren> = () => {
  const { formatMessage } = useIntl();

  const user = useUser<any>();

  const handleSubmit = async (values: any): Promise<void> => {
    return user
      .signUp(values, "/message/registration-successful", { isProfileRequestRequired: false })
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.created" }), { variant: "success" });
      })
      .catch(e => {
        if (e.code === "auth/email-already-in-use") {
          enqueueSnackbar(formatMessage({ id: "snackbar.duplicateEmail" }), { variant: "error" });
        } else {
          console.error(e);
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.getProfile("/profile");
    }
  }, [user.isAuthenticated()]);

  const initialValues = {
    email: "",
    displayName: "",
    password: "",
    confirm: "",
    blockchainAgree: false,
    termsAgree: false,
  };

  return (
    <StyledAuthRoot container>
      <Grid size={{ sm: 12 }}>
        <PageHeader message="pages.guest.registration" />
        <FormWrapper
          name="Registration"
          showButtons={false}
          showPrompt={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
          renderButtons={props => <RegistrationButtons {...props} />}
        >
          <Grid container size={12} spacing={4}>
            <InputBox size={{ sm: 12, md: 6 }} labelId="email">
              <TextInput showLabel={false} name="email" variant="outlined" />
            </InputBox>
            <InputBox size={{ sm: 12, md: 6 }} labelId="displayName">
              <TextInput showLabel={false} name="displayName" variant="outlined" />
            </InputBox>
          </Grid>
          <Grid container size={12} spacing={4}>
            <InputBox size={{ sm: 12, md: 6 }} labelId="password">
              <PasswordInput showLabel={false} name="password" autoComplete="new-password" variant="outlined" />
            </InputBox>
            <InputBox size={{ sm: 12, md: 6 }} labelId="confirm">
              <PasswordInput showLabel={false} name="confirm" autoComplete="new-password" variant="outlined" />
            </InputBox>
          </Grid>
          <Grid
            mt={2}
            container
            size={{ sm: 12, md: 6 }}
            display="flex"
            flexDirection="column"
            alignSelf="flex-start"
            gap={2}
          >
            <CheckboxInput
              disableRipple
              icon={<span />}
              checkedIcon={<Check />}
              name="termsAgree"
              label={
                <Typography component="span">
                  <FormattedMessage
                    id="form.labels.termsAgree"
                    values={{
                      a: value => (
                        <RouterLink className="Registration-TermsLink" to={ROUTES.TERMS_OF_USE} target="_blank">
                          <Typography component="span" sx={{ display: "inline" }} typography="ralewayRegular">
                            {value}
                          </Typography>
                        </RouterLink>
                      ),
                    }}
                  />
                </Typography>
              }
            />
          </Grid>
        </FormWrapper>
      </Grid>
    </StyledAuthRoot>
  );
};
