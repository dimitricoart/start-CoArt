import { Box, styled } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";

import { BackIcon } from "../../../shared";

const StyledRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.75),
  ...theme.typography.ralewayMedium,
  fontSize: 18,
  color: theme.palette.custom.grey["200"],
  cursor: "pointer",
}));

export const BackButton = () => {
  const navigate = useNavigate();
  const onClick = () => void navigate(-1);
  return (
    <StyledRoot onClick={onClick}>
      <BackIcon />
      <FormattedMessage id="components.backBtn" />
    </StyledRoot>
  );
};
