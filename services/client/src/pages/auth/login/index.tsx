import { ComponentType, FC } from "react";
import { useIntl } from "react-intl";
import { Grid } from "@mui/material";
import { matchPath, useLocation } from "react-router";
import { enqueueSnackbar } from "notistack";
import { getAuth, signInWithCustomToken } from "firebase/auth";

import { useApi } from "@framework/mui-form";
import { getFirebaseApp } from "../../../libs/firebase";
import { PasswordInput, TextInput } from "../../../components/inputs";
import type { ILoginDto } from "../../../libs/providers/user-provider";
import { useUser } from "../../../libs/providers/user-provider";
import { useDidMountEffect } from "../../../libs/use-did-mount-effect";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { LoginButtons } from "./buttons";
import { StyledAuthRoot } from "../styled";
import { PageHeader } from "../../../components/page-header";
import { InputBox } from "../../../components/input-box";
import { ROUTES } from "../../../routes/routes";

export interface IFirebaseLoginButtonProps {
  onTokenVerified: (token: string) => Promise<void>;
}

export interface IFirebaseLoginProps {
  buttons?: Array<ComponentType<IFirebaseLoginButtonProps>>;
}

export const Login: FC<IFirebaseLoginProps> = props => {
  const { buttons } = props;

  const { formatMessage } = useIntl();
  const location = useLocation();
  const user = useUser();
  const auth = getAuth(getFirebaseApp()!);
  const api = useApi();

  const handleSubmit = async (values: ILoginDto): Promise<void> => {
    const isLoginPage = !!matchPath(location.pathname, ROUTES.LOGIN);
    await user.logIn(values, isLoginPage ? void 0 : location.pathname).catch(e => {
      console.error(e);
      if (e.code === "auth/user-not-found") {
        enqueueSnackbar(formatMessage({ id: "snackbar.userNotFound" }), { variant: "error" });
      } else if (e.code === "auth/invalid-credential") {
        enqueueSnackbar(formatMessage({ id: "snackbar.incorrectCredentials" }), { variant: "error" });
      } else if (e.message) {
        enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
      } else {
        console.error(e);
      }
    });
  };

  const handleTokenVerified = async (token: string) => {
    if (!token) {
      return;
    }

    const userCredentials = await signInWithCustomToken(auth, token);
    return userCredentials.user.getIdToken(true).then(accessToken => {
      const now = Date.now();
      api.setToken({
        accessToken,
        accessTokenExpiresAt: now + 1000 * 60 * 60,
        refreshToken: "",
        refreshTokenExpiresAt: now + 1000 * 60 * 60,
      });
    });
  };

  useDidMountEffect(() => {
    void user.getProfile("/dashboard/showroom");
  }, [user.isAuthenticated()]);

  const initialValues = {
    password: "",
    email: "",
  };

  return (
    <StyledAuthRoot container>
      <Grid size={{ sm: 12 }}>
        <PageHeader message="pages.guest.login" />

        <FormWrapper
          name="Login"
          showButtons={false}
          showPrompt={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
          renderButtons={props => <LoginButtons {...props} />}
        >
          <InputBox
            sx={theme => ({
              minWidth: "50%",
              [theme.breakpoints.down("md")]: {
                minWidth: "100%",
              },
            })}
            labelId={"email"}
          >
            <TextInput showLabel={false} name="email" autoComplete="email" variant="outlined" />
          </InputBox>
          <InputBox
            sx={theme => ({
              minWidth: "50%",
              [theme.breakpoints.down("md")]: {
                minWidth: "100%",
              },
            })}
            labelId={"password"}
          >
            <PasswordInput showLabel={false} name="password" autoComplete="current-password" variant="outlined" />
          </InputBox>
          {buttons?.map((Button, i) => (
            <Button key={i} onTokenVerified={handleTokenVerified} />
          ))}
        </FormWrapper>
      </Grid>
    </StyledAuthRoot>
  );
};
