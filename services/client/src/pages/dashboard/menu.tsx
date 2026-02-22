import { FC } from "react";
import { Tab } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router";
import { useIntl } from "react-intl";

import { useUser } from "../../libs/providers/user-provider";
import { IUser, UserRole } from "@framework/types";

import { ROUTES } from "../../routes/routes";
import { StyledDashboardTabs } from "./styled";

const menu = [
  {
    label: "pages.dashboard.menu.merchant",
    href: ROUTES.DASHBOARD_MERCHANT_UPDATE,
    roles: [UserRole.SUPER, UserRole.ADMIN, UserRole.OWNER],
  },
  {
    label: "pages.dashboard.menu.showrooms",
    href: ROUTES.DASHBOARD_SHOWROOM_LIST,
    roles: [UserRole.SUPER, UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    label: "pages.dashboard.menu.assets",
    href: ROUTES.DASHBOARD_ASSET_LIST,
    roles: [UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    label: "pages.dashboard.menu.ledger",
    href: ROUTES.DASHBOARD_LEDGER_LIST,
    roles: [UserRole.SUPER, UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    label: "pages.dashboard.menu.favorites",
    href: ROUTES.DASHBOARD_FAVORITES,
    roles: [UserRole.SUPER, UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    label: "pages.dashboard.menu.wallet",
    href: ROUTES.DASHBOARD_WALLET,
    roles: [UserRole.SUPER, UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    label: "pages.dashboard.menu.settings",
    href: ROUTES.DASHBOARD_SETTINGS,
    roles: [UserRole.SUPER, UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER],
  },
  {
    label: "pages.dashboard.menu.validation",
    href: ROUTES.DASHBOARD_ASSET_VALIDATION,
    roles: [UserRole.SUPER, UserRole.ADMIN],
  },
  {
    label: "pages.dashboard.menu.merchants",
    href: ROUTES.DASHBOARD_MERCHANTS,
    roles: [UserRole.SUPER, UserRole.ADMIN],
  },
];

interface ILinkTabProps {
  label: string;
  href: string;
  selected?: boolean;
}

const LinkTab: FC<ILinkTabProps> = props => {
  const { href, ...rest } = props;
  return <Tab component={RouterLink} to={href} {...rest} />;
};

export const DashboardTabs: FC = () => {
  const location = useLocation();
  const { formatMessage } = useIntl();
  const user = useUser<IUser>();

  const filteredMenu = menu.filter(m => m.roles.some(r => user.profile.userRoles.includes(r)));

  return (
    <StyledDashboardTabs
      orientation="vertical"
      value={Math.max(
        0,
        filteredMenu.findIndex(e => e.href === location.pathname),
      )}
      aria-label="dashboard nav tabs"
      role="navigation"
    >
      {filteredMenu.map(({ label, href }, i) => (
        <LinkTab label={formatMessage({ id: label })} href={href} key={i} />
      ))}
    </StyledDashboardTabs>
  );
};
