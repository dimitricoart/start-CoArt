import { Fragment, MouseEvent, useState } from "react";
import { Avatar, Box, IconButton, MenuItem } from "@mui/material";
import { matchPath, NavLink as RouterNavLink, Link as RouterLink } from "react-router";
import { FormattedMessage } from "react-intl";
import { Login as LoginIcon } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";

import type { IUser } from "@framework/types";
import { useUser } from "../../../libs/providers/user-provider";
import { companyName } from "@framework/constants";

import { CloseIcon, UserIcon } from "../../../shared";
import { StyledLink, StyledMenuTriggerRoot } from "../styled";
import { StyledContentBox, StyledMenuHeader, StyledMenuWrapper, StyledSwipeableDrawer } from "./styled";
import { ROUTES } from "../../../routes/routes";

export const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const user = useUser<IUser>();
  const queryClient = useQueryClient();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logout = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    setOpen(false);
    await user.logOut("/login");
    void queryClient.removeQueries();
  };

  if (!user.isAuthenticated()) {
    if (matchPath(location.pathname, ROUTES.LOGIN)) {
      return null;
    }

    return (
      <StyledMenuTriggerRoot $hasAvatar={false} component={RouterLink} to={ROUTES.LOGIN}>
        <Avatar>
          <LoginIcon />
        </Avatar>
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
        onClick={() => setOpen(true)}
      >
        <Avatar alt={user.profile.displayName} src={user.profile.imageUrl || ""}>
          <UserIcon />
        </Avatar>
      </StyledMenuTriggerRoot>
      <StyledSwipeableDrawer open={open} anchor="right" onOpen={handleOpen} onClose={handleClose}>
        <StyledMenuWrapper>
          <StyledMenuHeader>
            <StyledLink component={RouterLink} to={ROUTES.MAIN} onClick={handleClose}>
              <Box component="img" alt={companyName} src={"/assets/logo.svg"} />
            </StyledLink>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </StyledMenuHeader>

          <StyledContentBox>
            <MenuItem
              onClick={handleClose}
              color="inherit"
              component={RouterNavLink}
              to="/profile"
              selected={!!matchPath(location.pathname, ROUTES.PROFILE)}
            >
              <FormattedMessage id="components.header.menu.profile" />
            </MenuItem>
            {user.profile.merchant?.id ? (
              <MenuItem
                onClick={handleClose}
                color="inherit"
                component={RouterNavLink}
                to={`/showrooms/${user.profile.merchant?.id}`}
                selected={
                  !!matchPath(location.pathname, ROUTES.SHOWROOM_VIEW.replace(":merchantId", user.profile.merchant?.id))
                }
              >
                <FormattedMessage id="components.header.menu.showroom" />
              </MenuItem>
            ) : null}
            {user.profile.merchant?.id ? (
              <MenuItem
                onClick={handleClose}
                color="inherit"
                component={RouterNavLink}
                to={`/dashboard/showroom`}
                selected={!!matchPath(location.pathname, ROUTES.DASHBOARD)}
              >
                <FormattedMessage id="components.header.menu.dashboard" />
              </MenuItem>
            ) : null}
            <MenuItem to="/logout" onClick={logout} component={RouterNavLink}>
              <FormattedMessage id="components.header.menu.logout" />
            </MenuItem>
          </StyledContentBox>
        </StyledMenuWrapper>
      </StyledSwipeableDrawer>
    </Fragment>
  );
};
