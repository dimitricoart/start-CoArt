import { FC, ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink, matchPath, useLocation } from "react-router";
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import { AssetStatus, IAsset } from "@framework/types";

import { ROUTES } from "../../../../routes/routes";
import { StyledCardRoot } from "../../../../components/styled";
import { Chip, ChipStatus } from "../../../../components/chip";
import { ApprovedIcon, DeclinedIcon, PendingIcon } from "../../../../shared";
import { AssetValidateButton } from "../../../../components/buttons";
import { formatNumbersInString } from "../../../../utils/format-title";

interface IAssetCardProps {
  asset: IAsset;
  showDescription?: boolean;
}

const renderAssetChip: Record<
  AssetStatus,
  {
    status: ChipStatus;
    icon: ReactElement;
    label: string;
  }
> = {
  [AssetStatus.NEW]: {
    status: "pending",
    icon: <PendingIcon />,
    label: "components.chip.pending",
  },
  [AssetStatus.APPROVED]: {
    status: "approved",
    icon: <ApprovedIcon />,
    label: "components.chip.approved",
  },
  [AssetStatus.DECLINED]: {
    status: "declined",
    icon: <DeclinedIcon />,
    label: "components.chip.declined",
  },
  [AssetStatus.REJECTED]: {
    status: "rejected",
    icon: <DeclinedIcon />,
    label: "components.chip.rejected",
  },
  [AssetStatus.FINALIZED]: {
    status: "finalized",
    icon: <ApprovedIcon />,
    label: "components.chip.finalized",
  },
};

export const AssetCard: FC<IAssetCardProps> = props => {
  const { asset } = props;

  const location = useLocation();
  const chipOptions = renderAssetChip[asset.assetStatus];

  return (
    <StyledCardRoot elevation={0}>
      <CardActionArea component={RouterLink} to={ROUTES.ASSET_VIEW.replace(":assetId", asset.id.toString())}>
        <CardMedia sx={{ height: 250 }} image={asset.imageUrl} title={asset.title} />
        <CardContent>
          <Typography variant="ralewayMedium" fontSize={24} component="h4" mb={0.75}>
            {formatNumbersInString(asset.title)}
          </Typography>
          <Typography variant="ralewayMedium" fontSize={18} color="custom.typography.semiGrey" component="h6">
            {asset.artistName}
          </Typography>
        </CardContent>
        {matchPath(location.pathname, ROUTES.DASHBOARD_ASSET_VALIDATION) ? (
          <AssetValidateButton assetId={asset.id} />
        ) : null}
        {matchPath(location.pathname, ROUTES.DASHBOARD_ASSET_LIST) ||
        matchPath(location.pathname, ROUTES.DASHBOARD_ASSET_LIST) ? (
          <Chip
            className="AssetCard-chip"
            status={chipOptions.status}
            label={<FormattedMessage id={chipOptions.label} />}
            icon={chipOptions.icon}
          />
        ) : null}
      </CardActionArea>
    </StyledCardRoot>
  );
};
