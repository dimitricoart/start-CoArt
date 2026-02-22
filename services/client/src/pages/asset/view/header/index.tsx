import { FC } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { RefetchOptions } from "@tanstack/react-query";

import { IAsset, IPhoto } from "@framework/types";

import { PhotosList } from "../../components";
import {
  AssetBuyNowButtons,
  AssetCreateFccButtons,
  AssetCreateOfferButtons,
  AssetLoginButtons,
  AssetProposePriceButtons,
} from "./buttons";
import { AssetViewHeaderTitle } from "./title";
import { AssetViewHeaderSubtitles } from "./subtitles";
import { AssetPrice } from "./price";

interface IAssetViewHeaderProps {
  asset: IAsset;
  refetch: (options?: RefetchOptions) => Promise<any>;
}

export const AssetViewHeader: FC<IAssetViewHeaderProps> = ({ asset, refetch }) => {
  const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));

  return (
    <Grid container size={12} spacing={{ xs: 3, sm: 3, md: 13 }}>
      {isMd && (
        <Grid size={12}>
          <AssetViewHeaderTitle asset={asset} refetch={refetch} />
        </Grid>
      )}

      {asset.photos?.length ? (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <PhotosList
            photos={[{ imageUrl: asset.imageUrl, caption: "", uuid: asset.id, asset } as IPhoto, ...asset.photos]}
          />
        </Grid>
      ) : null}

      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 6,
          lg: asset.photos?.length ? 6 : 12,
          xl: asset.photos?.length ? 6 : 12,
        }}
      >
        {!isMd && <AssetViewHeaderTitle asset={asset} refetch={refetch} />}

        <Grid display="flex" flexDirection="column" gap={2}>
          <AssetViewHeaderSubtitles asset={asset} />
        </Grid>

        <Grid mt={3}>
          <AssetPrice asset={asset} />
        </Grid>

        <Grid mt={3} display="flex" gap={2}>
          <AssetLoginButtons asset={asset} />
          <AssetBuyNowButtons asset={asset} />
          <AssetProposePriceButtons asset={asset} />
          <AssetCreateFccButtons asset={asset} />
          <AssetCreateOfferButtons asset={asset} />
        </Grid>
      </Grid>
    </Grid>
  );
};
