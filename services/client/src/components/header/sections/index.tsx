import { FC, Fragment, MouseEvent, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink, matchPath, NavLink as RouterNavLink, useLocation } from "react-router";
import { Avatar, Fade, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";

import { useUser } from "../../../libs/providers/user-provider";
import type { IUser } from "@framework/types";

import { StyledMenu } from "./styled";
import { UserIcon } from "../../../shared";
import { ROUTES } from "../../../routes/routes";
import { StyledMenuTriggerRoot } from "../styled";

export const Sections: FC = () => {
  const location = useLocation();
  const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));
  const queryClient = useQueryClient();

  const menuWidth = useRef<number | null>(null);
  const [anchor, setAnchor] = useState<Element | null>(null);
  const open = Boolean(anchor);

  const user = useUser<IUser>();

  const handleMenuOpen = (event: MouseEvent): void => {
    setAnchor(event.currentTarget);
    if (!menuWidth.current) {
      menuWidth.current = event.currentTarget.clientWidth;
    }
  };

  const handleMenuClose = (): void => {
    setAnchor(null);
  };

  const logout = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    handleMenuClose();
    await user.logOut("/login");
    void queryClient.removeQueries();
  };

  if (!user.isAuthenticated()) {
    if (matchPath(location.pathname, ROUTES.LOGIN)) {
      return null;
    }

    return (
      <StyledMenuTriggerRoot
        $hasAvatar={false}
        sx={{
          textDecoration: "none",
          gap: "24px",
        }}
        component={RouterLink}
        to={ROUTES.LOGIN}
      >
        <Avatar>
          <LoginIcon />
        </Avatar>
        {!isMd && (
          <Typography typography="playfairSemibold">
            <FormattedMessage id="components.header.menu.login" />
          </Typography>
        )}
      </StyledMenuTriggerRoot>
    );
  }

  return (
    <Fragment>
      <StyledMenuTriggerRoot
        $hasAvatar={!!user.profile.imageUrl}
        id="OpenSiteMenuButton"
        aria-haspopup="true"
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        data-testid="OpenSiteMenuButton"
        onClick={handleMenuOpen}
      >
        <Avatar alt={user.profile.displayName} src={user.profile.imageUrl || ""}>
          <UserIcon />
        </Avatar>
        {!isMd && <Typography variant={"playfairSemibold"}>{user.profile.displayName || ""}</Typography>}
      </StyledMenuTriggerRoot>
      <StyledMenu
        id="material-appbar"
        anchorEl={anchor}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          list: {
            "aria-labelledby": "OpenSiteMenuButton",
          },
          paper: {
            sx: {
              width: menuWidth.current,
            },
          },
        }}
        slots={{ transition: Fade }}
      >
        <MenuItem
          onClick={handleMenuClose}
          color="inherit"
          component={RouterNavLink}
          to="/profile"
          selected={!!matchPath(location.pathname, ROUTES.PROFILE)}
        >
          <FormattedMessage id="components.header.menu.profile" />
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          color="inherit"
          component={RouterNavLink}
          to={ROUTES.DASHBOARD}
          selected={!!matchPath(location.pathname, ROUTES.DASHBOARD)}
        >
          <FormattedMessage id="components.header.menu.dashboard" />
        </MenuItem>
        <MenuItem to="/logout" onClick={logout} component={RouterNavLink}>
          <FormattedMessage id="components.header.menu.logout" />
        </MenuItem>
      </StyledMenu>
    </Fragment>
  );
};
