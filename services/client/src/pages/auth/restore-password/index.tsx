import { FC } from "react";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useNavigate } from "react-router";

import { PasswordInput } from "../../../components/inputs";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { StyledAuthRoot } from "../styled";
import { InputBox } from "../../../components/input-box";
import { PageHeader } from "../../../components/page-header";
import { PasswordButton } from "../../../components/buttons";
import { ROUTES } from "../../../routes/routes";

interface IRestorePasswordDto {
  password: string;
  confirm: string;
  token: string;
}

export const RestorePassword: FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("oobCode");

  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const auth = getAuth();

  const handleSubmit = async (values: IRestorePasswordDto): Promise<void> => {
    try {
      if (!token) {
        throw Error("redirect");
      }
      await confirmPasswordReset(auth, token, values.password);
      void navigate(ROUTES.LOGIN);
      enqueueSnackbar(formatMessage({ id: "snackbar.passwordChanged" }), { variant: "success" });
    } catch (e) {
      if (e.status === 400) {
        enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
      } else if (e.status) {
        enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
      } else {
        console.error(e);
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      }
    }
  };

  return (
    <StyledAuthRoot container>
      <PageHeader message="pages.guest.restorePassword" />
      <FormWrapper
        name="RestorePassword"
        showButtons={false}
        showPrompt={false}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          password: "",
          confirm: "",
        }}
        renderButtons={({ isLoading }) => (
          <PasswordButton textId="form.buttons.saveNewPassword" isLoading={isLoading} />
        )}
      >
        <Grid container size={7}>
          <InputBox size={{ sm: 12 }} labelId="password">
            <PasswordInput showLabel={false} name="password" autoComplete="new-password" variant="outlined" />
          </InputBox>
          <InputBox size={{ sm: 12 }} labelId="confirm">
            <PasswordInput showLabel={false} name="confirm" autoComplete="new-password" variant="outlined" />
          </InputBox>
        </Grid>
      </FormWrapper>
    </StyledAuthRoot>
  );
};
