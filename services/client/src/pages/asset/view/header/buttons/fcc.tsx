import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { matchPath, useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { AssetStatus, IAsset, type IUser } from "@framework/types";
import { useUser } from "../../../../../libs/providers/user-provider";
import { useApi } from "@framework/mui-form";

import { Button } from "../../../../../components/buttons";
import { ROUTES } from "../../../../../routes/routes";

interface IAssetCreateFccButtonsProps {
  asset: IAsset;
}

export const AssetCreateFccButtons: FC<IAssetCreateFccButtonsProps> = ({ asset }) => {
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

  const handleCreateFcc = useCallback(() => {
    if (!wallet) {
      void navigate(ROUTES.DASHBOARD_WALLET, {
        state: {
          redirectUrl: location.pathname,
        },
      });
    } else {
      void navigate(ROUTES.ASSET_FCC.replace(":assetId", asset.id));
    }
  }, [wallet]);

  // for user
  if (!user.isAuthenticated()) {
    return null;
  }

  // displayed on asset page
  if (!matchPath(location.pathname, ROUTES.ASSET_VIEW.replace(":assetId", asset.id))) {
    return null;
  }

  // owner + approved
  if (asset?.merchant?.id !== user.profile?.merchant?.id) {
    return null;
  } else {
    if (asset.assetStatus !== AssetStatus.APPROVED) {
      return null;
    }
  }

  return (
    <Button
      sx={{ minWidth: 250 }}
      variant="contained"
      color="primary"
      data-testid="CreateFccButton"
      onClick={handleCreateFcc}
    >
      <FormattedMessage id="pages.asset.view.createFcc" />
    </Button>
  );
};
