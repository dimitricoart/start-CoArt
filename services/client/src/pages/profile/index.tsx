import { FC } from "react";
import { useSnackbar } from "notistack";
import { FormattedMessage, useIntl } from "react-intl";
import { Stack } from "@mui/material";

import { EnabledLanguages } from "@framework/constants";
import type { IProfile } from "../../libs/providers/user-provider";
import { SelectInput, TextInput } from "../../components/inputs";
import { useAppDispatch, setLanguage } from "../../libs/store";
import { useUser } from "../../libs/providers/user-provider";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { selectInputLabelProps, StyledPageRoot } from "../../components/styled";
import { CONTENT_WIDTH } from "../../shared";
import { InputBox } from "../../components/input-box";
import { ImageInput } from "../../components/inputs";
import { Button } from "../../components/buttons";

export interface IProfileProps {}

export const Profile: FC<IProfileProps> = () => {
  const user = useUser<IProfile>();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();

  const onClick = (): void => {
    enqueueSnackbar(formatMessage({ id: "form.hints.emailWarning" }), { variant: "info" });
  };

  const handleSubmit = async (data: Partial<IProfile>): Promise<void> => {
    return user.setProfile(data).then(() => {
      if (user.profile.language !== data.language) {
        dispatch(setLanguage(data.language));
      }
    });
  };

  const { email, displayName, language, imageUrl } = user.profile;

  const fixedValues = {
    email,
    displayName,
    language,
    imageUrl,
  };

  return (
    <StyledPageRoot
      sx={theme => ({
        width: CONTENT_WIDTH,
        margin: "0 auto",
        [theme.breakpoints.down("md")]: {
          width: "100%",
          margin: 0,
        },
      })}
      component="main"
    >
      <FormWrapper
        showPrompt={false}
        showButtons={false}
        initialValues={fixedValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        name="profile"
        renderButtons={({ isLoading, disabled }) => (
          <Button
            className="Profile-SubmitButton"
            isLoading={isLoading}
            variant="contained"
            type="submit"
            color="primary"
            disabled={disabled}
            data-testid="ProfileSubmitButton"
          >
            <FormattedMessage id="form.buttons.submit" />
          </Button>
        )}
        onSuccess={() => {
          enqueueSnackbar(formatMessage({ id: "snackbar.success" }), { variant: "success" });
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 5, sm: 10 }}>
          <Stack>
            <ImageInput
              showLabel
              mode="avatar"
              variant="image"
              name="imageUrl"
              bucket={process.env.GOOGLE_STORAGE_BUCKET_AVATARS}
            />
          </Stack>
          <Stack gap={3}>
            <InputBox labelId="email">
              <TextInput
                showLabel={false}
                name="email"
                autoComplete="off"
                onClick={onClick}
                variant="outlined"
                disabled
              />
            </InputBox>
            <InputBox labelId="displayName">
              <TextInput showLabel={false} name="displayName" variant="outlined" />
            </InputBox>
            <SelectInput
              InputLabelProps={selectInputLabelProps}
              name="language"
              options={EnabledLanguages}
              variant="outlined"
            />
          </Stack>
        </Stack>
      </FormWrapper>
    </StyledPageRoot>
  );
};
