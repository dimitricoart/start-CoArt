import { FC } from "react";
import { useIntl } from "react-intl";
import { IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link as RouterLink } from "react-router";
import { RefetchOptions } from "@tanstack/react-query";

import { AssetStatus, IAsset, type IUser } from "@framework/types";
import { useUser } from "../../../../libs/providers/user-provider";

import { FavoriteButton } from "../../../../components/buttons";
import { PageHeader } from "../../../../components/page-header";
import { ROUTES } from "../../../../routes/routes";

interface IAssetViewHeaderTitleProps {
  asset: IAsset;
  refetch: (options?: RefetchOptions) => Promise<any>;
}

export const AssetViewHeaderTitle: FC<IAssetViewHeaderTitleProps> = ({ asset, refetch }) => {
  const user = useUser<IUser | null>();
  const { formatMessage } = useIntl();

  return (
    <PageHeader
      renderGrow={false}
      titleSize={10}
      sx={{ marginTop: 0, display: "flex", flexWrap: "nowrap", alignItems: "flex-start" }}
      message="pages.asset.view.title"
      data={asset}
    >
      {user.isAuthenticated() ? (
        asset?.merchant?.id === user.profile?.merchant?.id ? (
          ![AssetStatus.FINALIZED, AssetStatus.REJECTED].includes(asset.assetStatus) ? (
            <Tooltip title={formatMessage({ id: "pages.asset.view.edit" })} enterDelay={300}>
              <IconButton component={RouterLink} to={ROUTES.DASHBOARD_ASSET_UPDATE.replace(":assetId", asset.id)}>
                <Edit />
              </IconButton>
            </Tooltip>
          ) : null
        ) : (
          <FavoriteButton assetId={asset.id} active={!!(asset.favorites || []).length} refetch={refetch} />
        )
      ) : null}
    </PageHeader>
  );
};
