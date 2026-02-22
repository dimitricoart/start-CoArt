import { FC, Fragment, MouseEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IconButton, Menu, MenuItem, MenuItemProps, MenuProps, Tooltip, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../libs/store";
import { languageSelector, setLanguage } from "../../libs/store/localization";
import { EnabledLanguages } from "@framework/constants";

export interface ILocalizationProps {
  languages: Array<EnabledLanguages>;
  menuProps?: Partial<MenuProps>;
  menuItemProps?: MenuItemProps;
}

export const Localization: FC<ILocalizationProps> = props => {
  const { languages, menuProps = {}, menuItemProps = {} } = props;
  const { formatMessage } = useIntl();

  const languageFromState = useAppSelector<EnabledLanguages>(languageSelector);
  const dispatch = useAppDispatch();

  const [anchor, setAnchor] = useState<Element | null>(null);

  const handleLanguageIconClick = (e: MouseEvent): void => {
    setAnchor(e.currentTarget);
  };

  const handleLanguageMenuClose = (): void => {
    setAnchor(null);
  };

  const handleLanguageMenuItemClick = (language: string) => (): void => {
    dispatch(setLanguage(language as EnabledLanguages));
    document.documentElement.setAttribute("lang", language);
    handleLanguageMenuClose();
  };

  const firstLangEl = languages[0];
  const secondLangEl = languages[1];

  return (
    <Fragment>
      <Tooltip title={formatMessage({ id: "components.header.language.switch" })} enterDelay={300}>
        <IconButton
          color="inherit"
          aria-owns={anchor ? "language-menu" : undefined}
          aria-haspopup="true"
          onClick={handleLanguageIconClick}
          data-testid="SwitchLanguage"
        >
          <Typography variant="playfairRegular" color="custom.typography.semiBlack">
            {firstLangEl}
          </Typography>
          <Typography variant="playfairRegular" color="custom.typography.grey">
            {"/"}
          </Typography>
          <Typography variant="playfairRegular" color="custom.typography.grey">
            {secondLangEl}
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu id="language-menu" anchorEl={anchor} open={!!anchor} onClose={handleLanguageMenuClose} {...menuProps}>
        {languages.map(language => (
          <MenuItem
            key={language}
            selected={languageFromState === language}
            onClick={handleLanguageMenuItemClick(language)}
            {...menuItemProps}
          >
            <FormattedMessage id={`enums.language.${language}`} />
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
