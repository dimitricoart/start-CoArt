import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

import { StyledDocumentConditionsRoot } from "../styled";

export const DocumentLoading = () => {
  return (
    <StyledDocumentConditionsRoot>
      <Typography variant="ralewayMedium" fontSize={18}>
        <FormattedMessage id="form.pdf.loading" />
      </Typography>
      <CircularProgress color="primary" size="medium" />
    </StyledDocumentConditionsRoot>
  );
};
