import { FC } from "react";
import { Typography } from "@mui/material";
import { FormattedNumber } from "react-intl";
import { matchPath, useLocation } from "react-router";

import { IAsset, type IUser } from "@framework/types";
import { useUser } from "../../../../libs/providers/user-provider";

import { ROUTES } from "../../../../routes/routes";

interface IAssetAssetPriceProps {
  asset: IAsset;
}

export const AssetPrice: FC<IAssetAssetPriceProps> = ({ asset }) => {
  const user = useUser<IUser | null>();
  const location = useLocation();

  if (!user.isAuthenticated()) {
    return null;
  }

  // displayed on ledger page
  if (matchPath(location.pathname, ROUTES.ASSET_VIEW.replace(":assetId", asset.id))) {
    return null;
  }

  // should have offers
  if (!asset.offers?.length) {
    return null;
  }

  return (
    <Typography variant="playfairRegular" fontSize={45}>
      <FormattedNumber
        value={asset.offers[0].price}
        style="currency"
        currency="EUR"
        minimumFractionDigits={0}
        maximumFractionDigits={0}
      />
    </Typography>
  );
};
