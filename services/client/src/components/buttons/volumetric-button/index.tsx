import { Button, ButtonProps, styled, Theme, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ButtonColors } from "../../../shared";

interface IVolumetricButtonProps extends ButtonProps {
  to?: string;
  text?: string;
  customColor?: ButtonColors;
}

const stylesByColorValue: (theme: Theme) => Record<ButtonColors, any> = theme => ({
  orange: {
    basic: {
      background: `linear-gradient(180deg, ${theme.palette.custom.orange["300"]} 0%, ${theme.palette.custom.orange["800"]} 100%)`,
      border: `1px solid ${theme.palette.custom.orange["300"]}`,
      boxShadow: `0 4px 0 ${theme.palette.custom.orange["900"]}`,
      color: theme.palette.custom.white["100"],
    },
    hover: {
      boxShadow: `0 4px 0 ${theme.palette.custom.orange["900"]}`,
    },
    active: {
      boxShadow: `0 0 0 ${theme.palette.custom.orange["900"]}`,
    },
  },
  white: {
    basic: {
      background: `linear-gradient(180deg, ${theme.palette.custom.white["300"]} 0%, ${theme.palette.custom.white["600"]} 100%)`,
      border: `1px solid ${theme.palette.custom.white["400"]}`,
      boxShadow: `0 4px 0 ${theme.palette.custom.grey["400"]}`,
      color: theme.palette.custom.grey["500"],
    },
    hover: {
      boxShadow: `0 4px 0 ${theme.palette.custom.grey["400"]}`,
    },
    active: {
      boxShadow: `0 0 0 ${theme.palette.custom.grey["400"]}`,
    },
  },
});

const StyledButton = styled(Button, { shouldForwardProp: prop => prop !== "$customColor" })<
  ButtonProps & { $customColor: ButtonColors }
>(({ theme, $customColor }) => ({
  width: "100%",
  position: "relative",
  overflow: "visible",
  padding: theme.spacing(2.75, 2.5),
  borderRadius: theme.spacing(2.5),
  textTransform: "none",
  textAlign: "center",
  transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
  ...stylesByColorValue(theme)[$customColor].basic,

  "&.MuiButton-root": {
    disableRipple: true,
  },

  "&:hover": {
    ...stylesByColorValue(theme)[$customColor].hover,
  },

  "&:active": {
    ...stylesByColorValue(theme)[$customColor].active,
    transform: "translateY(4px)",
  },

  "& .MuiTypography-root": {
    width: "100%",
  },
}));

export const VolumetricButton = (props: IVolumetricButtonProps) => {
  const { text, children, customColor = "orange", ...restProps } = props;
  return (
    <StyledButton $customColor={customColor} {...restProps}>
      {text && (
        <Typography typography="playfairSemibold">
          <FormattedMessage id={text} />
        </Typography>
      )}
      {children}
    </StyledButton>
  );
};
