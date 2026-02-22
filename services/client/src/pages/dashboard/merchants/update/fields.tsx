import { FC, RefObject } from "react";
import { Stack } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";

import { TextInput, LexicalTextEditor } from "../../../../components/inputs";
import { IMerchantUpdateDto } from "@framework/types";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { InputBox } from "../../../../components/input-box";
import { ImageInput } from "../../../../components/inputs";
import { Button } from "../../../../components/buttons";
import { ROUTES } from "../../../../routes/routes";
import { StyledImagesBox } from "./styled";

export interface IMerchantUpdateFormProps {
  initialValues: IMerchantUpdateDto;
  innerRef?: RefObject<HTMLFormElement | null>;
  onSubmit: (values: IMerchantUpdateDto) => Promise<void>;
  redirect: string;
}

export const MerchantFields: FC<IMerchantUpdateFormProps> = props => {
  const navigate = useNavigate();

  return (
    <FormWrapper
      showButtons={false}
      validationSchema={validationSchema}
      name="assets"
      renderButtons={({ isLoading, disabled }) => (
        <Button
          className="MerchantUpdate-SubmitButton"
          isLoading={isLoading}
          variant="contained"
          type="submit"
          color="primary"
          disabled={disabled}
          data-testid="MerchantUpdateSubmitButton"
        >
          <FormattedMessage id="form.buttons.update" />
        </Button>
      )}
      onSuccess={() => {
        void navigate(ROUTES.DASHBOARD_MERCHANTS);
      }}
      {...props}
    >
      <StyledImagesBox>
        <ImageInput variant="image" name="backgroundImageUrl" bucket={process.env.GOOGLE_STORAGE_BUCKET_MERCHANTS} />
        <ImageInput
          variant="image"
          className="MerchantForm-AvatarImageInput"
          name="imageUrl"
          mode="avatar"
          bucket={process.env.GOOGLE_STORAGE_BUCKET_MERCHANTS}
        />
      </StyledImagesBox>

      <InputBox sx={{ mb: 4 }} labelId="title" required>
        <TextInput showLabel={false} required name="title" variant="outlined" />
      </InputBox>
      <Stack mt={4.5} gap={4.5}>
        <LexicalTextEditor
          required
          name="subtitle"
          controls={{
            history: ["undo", "redo"],
            blockFormat: ["paragraph"],
            textFormat: ["bold", "italic", "underline", "strikethrough"],
            clear: ["editor"],
          }}
        />
        <LexicalTextEditor
          required
          name="description"
          controls={{
            history: ["undo", "redo"],
            blockFormat: ["paragraph", "h1", "h2", "h3", "h4", "h5", "h6", "number", "bullet", "quote"],
            textFormat: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "leftAlign",
              "centerAlign",
              "rightAlign",
              "link",
            ],
            clear: ["editor"],
          }}
        />
      </Stack>
    </FormWrapper>
  );
};
