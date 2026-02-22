import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink, matchPath } from "react-router";

import { AssetStatus, IAsset, type IUser } from "@framework/types";
import { useUser } from "../../../../../libs/providers/user-provider";

import { Button } from "../../../../../components/buttons";
import { ROUTES } from "../../../../../routes/routes";

interface IAssetCreateOfferButtonsProps {
  asset: IAsset;
}

export const AssetCreateOfferButtons: FC<IAssetCreateOfferButtonsProps> = ({ asset }) => {
  const user = useUser<IUser | null>();

  // for user
  if (!user.isAuthenticated()) {
    return null;
  }

  // displayed on ledger page
  if (matchPath(location.pathname, ROUTES.ASSET_VIEW.replace(":assetId", asset.id))) {
    return null;
  }

  // not owner
  if (asset?.merchant?.id !== user.profile?.merchant?.id) {
    return null;
  } else {
    if (asset.assetStatus !== AssetStatus.FINALIZED) {
      return null;
    }
  }

  return (
    <Button
      sx={{ minWidth: 250 }}
      customColor="white"
      variant="contained"
      color="primary"
      data-testid="CreateOfferButton"
      component={RouterLink}
      to={ROUTES.DASHBOARD_OFFER_CREATE.replace(":assetId", asset.id)}
    >
      <FormattedMessage id="pages.asset.view.createOffer" />
    </Button>
  );
};
