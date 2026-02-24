import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink, matchPath, useLocation, useNavigate } from "react-router";

import { IAsset, type IUser } from "@framework/types";
import { useUser } from "../../../../../libs/providers/user-provider";

import { Button } from "../../../../../components/buttons";
import { ROUTES } from "../../../../../routes/routes";

interface IAssetLoginButtonsProps {
  asset: IAsset;
}

export const AssetLoginButtons: FC<IAssetLoginButtonsProps> = ({ asset }) => {
  const user = useUser<IUser | null>();
  const location = useLocation();
  const navigate = useNavigate();

  // for guest
  if (user.isAuthenticated()) {
    return null;
  }

  // on asset view page (by asset id) we don't show this button
  if (matchPath(location.pathname, ROUTES.ASSET_VIEW.replace(":assetId", asset.id))) {
    return null;
  }

  const isLedgerOrAssetView =
    matchPath(ROUTES.LEDGER_VIEW, location.pathname) || matchPath(ROUTES.ASSET_VIEW, location.pathname);

  const handleClick = useCallback(() => {
    navigate(ROUTES.LOGIN, { state: { from: location.pathname } });
  }, [navigate, location.pathname]);

  if (isLedgerOrAssetView) {
    return (
      <Button
        sx={{ minWidth: 250 }}
        variant="contained"
        color="primary"
        data-testid="AssetLoginButton"
        onClick={handleClick}
      >
        <FormattedMessage id="pages.asset.view.buyNow" />
      </Button>
    );
  }

  return (
    <Button
      sx={{ minWidth: 250 }}
      variant="contained"
      color="primary"
      data-testid="AssetLoginButton"
      component={RouterLink}
      to={ROUTES.LOGIN}
    >
      <FormattedMessage id="form.buttons.login" />
    </Button>
  );
};
