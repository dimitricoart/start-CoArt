import { ReactNode, useState } from "react";
import { IconButton, InputBase, InputBaseProps, useMediaQuery } from "@mui/material";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import { CloseIcon, SearchIcon } from "../../../shared";
import { ROUTES } from "../../../routes/routes";
import { StyledSearchRoot } from "../../styled/search";
import { StyledIconMobileButton } from "./styled";

export interface ISearchProps extends Omit<InputBaseProps, "variant" | "InputProps" | "SelectProps" | "multiline"> {
  label?: ReactNode;
  helperText?: ReactNode;
  color?: InputBaseProps["color"];
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  multiline?: boolean;
  rows?: number;
}

export const Search = (props: ISearchProps) => {
  const {
    value: _value,
    onChange: _onChange,
    startAdornment,
    endAdornment,
    placeholder = "form.placeholders.assetName",
    ...rest
  } = props;
  const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));
  const [value, setValue] = useState("");

  const onClickCloseIcon = () => setValue("");
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const localizedPlaceholder = formatMessage({ id: placeholder });

  const onClickEndIcon = () => {
    if (isMd) {
      void navigate(`${ROUTES.ASSET_SEARCH}?query=${value}`);
    } else {
      if (!value) return;
      void navigate(`${ROUTES.ASSET_SEARCH}?query=${value}`);
      setValue("");
    }
  };

  const startIcon = value
    ? (startAdornment ?? (
        <IconButton sx={{ marginTop: "2px" }} className="Search-StartAdornment" onClick={onClickCloseIcon}>
          <CloseIcon />
        </IconButton>
      ))
    : undefined;

  const endIcon = endAdornment ?? (
    <IconButton className="Search-EndAdornment" onClick={onClickEndIcon}>
      <SearchIcon />
    </IconButton>
  );

  if (isMd) {
    return (
      <StyledIconMobileButton onClick={onClickEndIcon}>
        <SearchIcon />
      </StyledIconMobileButton>
    );
  }

  return (
    <StyledSearchRoot>
      <InputBase
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder={localizedPlaceholder}
        startAdornment={startIcon}
        endAdornment={endIcon}
        {...rest}
      />
    </StyledSearchRoot>
  );
};
