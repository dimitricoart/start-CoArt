import { FC } from "react";
import { matchPath, useLocation } from "react-router";

import { IAsset, type IUser } from "@framework/types";
import { useUser } from "../../../../../libs/providers/user-provider";

import { ProposeButton } from "../../../../../components/buttons";
import { ROUTES } from "../../../../../routes/routes";

interface IAssetProposePriceButtonsProps {
  asset: IAsset;
}

export const AssetProposePriceButtons: FC<IAssetProposePriceButtonsProps> = ({ asset }) => {
  const user = useUser<IUser | null>();
  const location = useLocation();

  // for user
  if (!user.isAuthenticated()) {
    return null;
  }

  // displayed on ledger page
  if (matchPath(location.pathname, ROUTES.ASSET_VIEW.replace(":assetId", asset.id))) {
    return null;
  }

  // not owner
  if (asset?.merchant?.id === user.profile?.merchant?.id) {
    return null;
  }

  return <ProposeButton assetId={asset.id} />;
};
