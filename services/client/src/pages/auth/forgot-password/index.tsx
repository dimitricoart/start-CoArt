import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router";

import { TextInput } from "../../../components/inputs";
import { useUser } from "../../../libs/providers/user-provider";
import type { IApiError } from "@framework/mui-form";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { StyledAuthRoot } from "../styled";
import { PageHeader } from "../../../components/page-header";
import { InputBox } from "../../../components/input-box";
import { PasswordButton } from "../../../components/buttons";

interface IForgotPasswordDto {
  email: string;
}

interface IForgotPasswordProps {
  resetEmailUrl?: string;
  successSendUrl?: string;
  profileRedirectUrl?: string;
}

export const ForgotPassword: FC<IForgotPasswordProps> = props => {
  const { resetEmailUrl = `/restore-password`, profileRedirectUrl = "/profile" } = props;

  const { formatMessage } = useIntl();

  const user = useUser<any>();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (values: IForgotPasswordDto): Promise<void> => {
    return sendPasswordResetEmail(auth, values.email, {
      url: `${window.location.origin}${resetEmailUrl}`,
      handleCodeInApp: true,
    })
      .then(() => {
        void navigate("/message/forgot-password-successful");
      })
      .catch((e: IApiError) => {
        if (e.status === 400) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.getProfile(profileRedirectUrl);
    }
  }, [user.isAuthenticated()]);

  return (
    <StyledAuthRoot container>
      <Grid size={{ sm: 10 }}>
        <PageHeader message="pages.guest.forgotPassword" />
        <FormWrapper
          name="ForgotPassword"
          showButtons={false}
          showPrompt={false}
          enableReinitialize={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{
            email: "",
          }}
          renderButtons={({ isLoading }) => <PasswordButton textId="form.buttons.sendOnEmail" isLoading={isLoading} />}
        >
          <InputBox container size={{ sm: 12, md: 7 }} labelId="email">
            <TextInput showLabel={false} name="email" autoComplete="username" variant="outlined" />
          </InputBox>
        </FormWrapper>
      </Grid>
    </StyledAuthRoot>
  );
};
