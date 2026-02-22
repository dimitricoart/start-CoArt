import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink, matchPath, useLocation } from "react-router";

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

  // for guest
  if (user.isAuthenticated()) {
    return null;
  }

  // displayed on ledger page
  if (matchPath(location.pathname, ROUTES.ASSET_VIEW.replace(":assetId", asset.id))) {
    return null;
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
