import { Button, ButtonProps, styled, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

interface IShowMoreButtonProps extends ButtonProps {
  text?: string;
  to?: string;
}

const StyledButton = styled(Button)(({ theme }) => ({
  maxWidth: "200px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(1.25),
  borderRadius: "200px",
  background: theme.palette.common.white,
  padding: theme.spacing(2, 4),
  color: theme.palette.custom.info,
  textTransform: "none",
  fontSize: "16px",

  [theme.breakpoints.down("lg")]: {
    marginTop: theme.spacing(3.75),
  },

  "& .ShowButton-Text": {
    ...theme.typography.playfairSemibold,
    display: "inline-block",
    borderBottom: `1px dashed ${theme.palette.custom.info}`,
    paddingBottom: theme.spacing(0.5),
  },
}));

export const ShowMoreButton = (props: IShowMoreButtonProps) => {
  const { children, text, ...restProps } = props;
  return (
    <StyledButton {...restProps}>
      {text && (
        <Typography className="ShowButton-Text">
          <FormattedMessage id={text} />
        </Typography>
      )}
      {children}
    </StyledButton>
  );
};
