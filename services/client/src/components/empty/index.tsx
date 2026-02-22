import React from "react";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { StyledEmptyRoot } from "./styled";

export const EmptyList = () => {
  return (
    <StyledEmptyRoot>
      <Typography variant="ralewayMedium" fontSize={32} lineHeight="36px" color="custom.typography.semiGrey">
        <FormattedMessage id="components.emptyList" />
      </Typography>
    </StyledEmptyRoot>
  );
};
