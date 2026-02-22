import { FC, RefObject } from "react";
import { FormattedMessage } from "react-intl";
import { Check } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";

import { CheckboxInput, TextInput, LexicalTextEditor, EntityInput } from "../../../../components/inputs";
import { IAssetCreateDto } from "@framework/types";
import { FormWrapper, FormState } from "@framework/mui-form";

import { InputBox } from "../../../../components/input-box";
import { InfoTooltip } from "../../../../components/tooltip";
import { GalleryInput, ImageInput } from "../../../../components/inputs";
import { Button } from "../../../../components/buttons";
import { ROUTES } from "../../../../routes/routes";
import { validationSchema } from "./validation";
import { CopyrightInput } from "./copyright";
import { DimensionsInput } from "./dimensions";
import { Specifications } from "./specifications";
import { DocumentsInput } from "./documents";

export interface IAssetCreateFormProps {
  initialValues: IAssetCreateDto;
  innerRef?: RefObject<HTMLFormElement | null>;
  onSubmit: (values: IAssetCreateDto) => Promise<void>;
  redirect: string;
}

export const AssetFields: FC<IAssetCreateFormProps> = props => {
  const navigate = useNavigate();

  return (
    <FormWrapper
      showButtons={false}
      validationSchema={validationSchema}
      name="assets"
      renderButtons={({ isLoading, disabled }) => (
        <Button
          className="AssetCreate-SubmitButton"
          isLoading={isLoading}
          variant="contained"
          type="submit"
          color="primary"
          disabled={disabled}
          data-testid="AssetCreateSubmitButton"
        >
          <FormattedMessage id="form.buttons.sendToExpertize" />
        </Button>
      )}
      onSuccess={() => {
        void navigate(ROUTES.DASHBOARD_ASSET_LIST);
      }}
      {...props}
    >
      <InputBox sx={{ mb: 4 }} labelId="title" required>
        <TextInput showLabel={false} required name="title" variant="outlined" />
      </InputBox>
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

      <ImageInput
        required
        name="imageUrl"
        variant="image"
        label={<FormattedMessage id="form.labels.coverImageUrl" />}
        bucket={process.env.GOOGLE_STORAGE_BUCKET_ASSETS}
        mode="avatar"
        showLabel={true}
        className="AssetForm-ImageInput"
      />
      <GalleryInput
        required
        showLabel
        hasCaption
        variant="image"
        name="photos"
        label={
          <FormattedMessage
            id="form.labels.galleryImages"
            values={{
              value: 10,
              minValue: 4,
              info: chunks => <InfoTooltip title={chunks}>{chunks}</InfoTooltip>,
            }}
          />
        }
        bucket={process.env.GOOGLE_STORAGE_BUCKET_ARTWORKS}
        className="AssetForm-GalleryInput"
        minCount={4}
      />

      <FormState />

      <EntityInput required name="showroomId" controller="showrooms" data={{}} />

      <Grid container size={12} flexDirection="column" mt={4}>
        <Typography variant="ralewayRegular" fontSize={20} color="custom.typography.black" mb={4}>
          <FormattedMessage id="pages.dashboard.assets.create.status" />
        </Typography>

        <CheckboxInput disableRipple icon={<span />} checkedIcon={<Check />} name="isCopyright" />

        <CopyrightInput />
      </Grid>

      <Specifications />

      <DimensionsInput />

      <DocumentsInput />
    </FormWrapper>
  );
};
