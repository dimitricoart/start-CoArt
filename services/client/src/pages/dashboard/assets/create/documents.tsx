import { Stack } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Check } from "@mui/icons-material";

import { CheckboxInput } from "../../../../components/inputs";

import { GalleryInput } from "../../../../components/inputs";
import { InfoTooltip } from "../../../../components/tooltip";

export const DocumentsInput = () => {
  return (
    <Stack mt={5} mb={5} gap={3.75}>
      <GalleryInput
        showLabel
        hasCaption
        maxSize={1024 * 1024 * 200} // 200 Mb
        urlKey="fileUrl"
        name="documents"
        label={
          <FormattedMessage
            id="form.labels.galleryFiles"
            values={{ value: 10, info: chunks => <InfoTooltip title={chunks}>{chunks}</InfoTooltip> }}
          />
        }
        bucket={process.env.GOOGLE_STORAGE_BUCKET_DOCUMENTS}
        className="AssetForm-GalleryInput"
      />
      <CheckboxInput disableRipple icon={<span />} checkedIcon={<Check />} name="isConfirmed" />
    </Stack>
  );
};
