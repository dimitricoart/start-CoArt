import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@mui/material";

import { StyledDocumentPrepareRoot } from "../styled";

export const DocumentPrepare = () => {
  return (
    <StyledDocumentPrepareRoot width="100%" alignItems="center">
      <Typography variant="ralewayMedium" fontSize={18}>
        <FormattedMessage id="form.pdf.preparing" />
      </Typography>
      <Typography variant="ralewayMedium" fontSize={18}>
        <FormattedMessage id="form.pdf.pleaseWait" />
      </Typography>
    </StyledDocumentPrepareRoot>
  );
};
