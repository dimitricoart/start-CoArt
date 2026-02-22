import { FC, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { AssetStatus, IAsset } from "@framework/types";

import { assetAlertTitle } from "../constants";
import { Alert } from "../../../../components/alert/Alert";

interface IAssetAlertProps {
  asset: IAsset;
}

export const AssetAlert: FC<IAssetAlertProps> = props => {
  const { asset } = props;
  const assetAlert = assetAlertTitle[asset.assetStatus as keyof typeof assetAlertTitle];

  if (asset.assetStatus !== AssetStatus.REJECTED && asset.assetStatus !== AssetStatus.DECLINED) {
    return null;
  }

  return (
    <Grid mb={5}>
      <Alert
        title={
          <Fragment>
            {assetAlert.icon}
            <FormattedMessage id={assetAlert.title} />
          </Fragment>
        }
        severity={assetAlert.severity}
      >
        <Typography className="MuiAlertDescription-root">{asset.comment}</Typography>
      </Alert>
    </Grid>
  );
};
