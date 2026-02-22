import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { matchPath, useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { IAsset, type IUser } from "@framework/types";
import { useUser } from "../../../../../libs/providers/user-provider";
import { useApi } from "@framework/mui-form";

import { Button } from "../../../../../components/buttons";
import { ROUTES } from "../../../../../routes/routes";

interface IAssetBuyNowButtonsProps {
  asset: IAsset;
}

export const AssetBuyNowButtons: FC<IAssetBuyNowButtonsProps> = ({ asset }) => {
  const user = useUser<IUser | null>();
  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      return api.fetchJson({
        url: "/wallet",
      });
    },
    enabled: user.isAuthenticated(),
    retry: false,
  });

  const handleBuyNow = useCallback(() => {
    if (!user.profile) {
      void navigate(ROUTES.LOGIN);
      return;
    }
    if (!wallet) {
      void navigate(ROUTES.DASHBOARD_WALLET, {
        state: {
          redirectUrl: location.pathname,
        },
      });
      return;
    }
    void navigate(ROUTES.PAYWALL.replace(":offerId", asset.offers![0].id));
  }, [wallet]);

  // for user
  if (!user.isAuthenticated()) {
    return null;
  }

  // displayed on ledger page
  if (matchPath(location.pathname, ROUTES.ASSET_VIEW.replace(":assetId", asset.id))) {
    return null;
  }

  // should have offers
  if (!asset?.offers?.length) {
    return null;
  }

  return (
    <Button
      sx={{ minWidth: 250 }}
      variant="contained"
      color="primary"
      data-testid="AssetBuyNowButton"
      onClick={handleBuyNow}
    >
      <FormattedMessage id="pages.asset.view.buyNow" />
    </Button>
  );
};
