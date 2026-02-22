import React from "react";
import {
  alpha,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography as MuiTypography,
  styled,
  Theme,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

import { LoadingDots } from "../../loading-dot";
import { ButtonColors } from "../../../shared";

export interface IButtonOwnProps {
  text?: React.ComponentProps<typeof FormattedMessage>["id"];
  data?: React.ComponentProps<typeof FormattedMessage>["values"];
  customColor?: ButtonColors;
  to?: string;
  isLoading?: boolean;
}

export type ButtonProps<C extends React.ElementType = "button"> = IButtonOwnProps & MuiButtonProps<C>;

const stylesByColorValue: (theme: Theme) => Record<ButtonColors, any> = theme => ({
  orange: {
    basic: {
      color: theme.palette.custom.white["100"],
      border: `1px solid ${alpha(theme.palette.custom.orange["300"], 0.5)}`,
      background: theme.palette.custom.orange["500"],
      boxShadow: `inset 0px -7px 17px 0px ${theme.palette.custom.orange["400"]}`,
    },
    hover: {
      boxShadow: `inset 0px -14px 17px 0px ${theme.palette.custom.orange["400"]}`,
    },
    disabled: {
      background: alpha(theme.palette.custom.orange["500"], 0.8),
    },
  },
  white: {
    basic: {
      color: theme.palette.custom.grey["500"],
      border: `1px solid ${alpha(theme.palette.custom.white["400"], 0.5)}`,
      background: theme.palette.custom.white["500"],
      boxShadow: `inset 0px -7px 17px 0px ${theme.palette.custom.white["600"]}`,
    },
    hover: {
      boxShadow: `inset 0px -14px 17px 0px ${theme.palette.custom.grey["100"]}`,
    },
    disabled: {
      background: alpha(theme.palette.custom.white["300"], 0.8),
    },
  },
});

const StyledMuiButton = styled(MuiButton, {
  shouldForwardProp: prop => prop !== "$customColor" && prop !== "$isLoading",
})<MuiButtonProps & { $customColor: ButtonColors; $isLoading?: boolean }>(
  ({ theme, $customColor = "orange", $isLoading = false }) => ({
    minWidth: 320,
    position: "relative",
    overflow: "visible",
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.spacing(2.5),
    textTransform: "none",
    transition: "box-shadow 160ms ease, background 160ms ease",
    textAlign: "center",
    cursor: "pointer",
    ...theme.typography.playfairSemibold,
    fontSize: 22,
    lineHeight: "34px",
    pointerEvents: $isLoading ? "none" : "auto",
    ...stylesByColorValue(theme)[$customColor].basic,

    "&:hover": {
      ...stylesByColorValue(theme)[$customColor].hover,
    },

    "&.Mui-disabled": {
      ...stylesByColorValue(theme)[$customColor].disabled,
    },

    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
    },
  }),
);

export const Button = <C extends React.ElementType = "button">(props: ButtonProps<C>) => {
  const { text, data, to, customColor = "orange", isLoading, children, ...restProps } = props;

  if (isLoading) {
    return (
      <StyledMuiButton to={to} $customColor={customColor} $isLoading={isLoading} {...restProps}>
        <LoadingDots />
      </StyledMuiButton>
    );
  }

  return (
    <StyledMuiButton to={to} $customColor={customColor} $isLoading={isLoading} {...restProps}>
      {text && (
        <MuiTypography>
          <FormattedMessage id={text} values={data} />
        </MuiTypography>
      )}
      {children}
    </StyledMuiButton>
  );
};
