import { FC } from "react";
import { Grid } from "@mui/material";

import type { IAsset } from "@framework/types";

import { AssetCard } from "./card";
import { AssetRejectDialog, AssetValidationContextProvider } from "../../../../components/buttons";

interface IAssetGridProps {
  assets: Array<IAsset>;
  isDashBoard?: boolean;
}

export const AssetGrid: FC<IAssetGridProps> = props => {
  const { assets, isDashBoard } = props;
  return (
    <AssetValidationContextProvider>
      <Grid container spacing={2} display="flex" justifyContent={isDashBoard ? "flex-start" : "center"}>
        {assets.map((asset: IAsset) => (
          <Grid sx={{ display: "flex" }} key={asset.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
      <AssetRejectDialog />
    </AssetValidationContextProvider>
  );
};
