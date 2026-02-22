import { FC, Fragment } from "react";
import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { IAsset } from "@framework/types";

interface IAssetViewHeaderSubtitlesProps {
  asset: IAsset;
}

export const AssetViewHeaderSubtitles: FC<IAssetViewHeaderSubtitlesProps> = ({ asset }) => {
  const { formatMessage } = useIntl();

  const subtitles = {
    artistName: asset.artistName ? `${formatMessage({ id: "pages.asset.view.by" })} ${asset.artistName}` : null,
    dimensions: `${asset.artworkCreatedAt ? `${new Date(asset.artworkCreatedAt).getFullYear()}, ` : ""}${asset.dimensions ? `${asset.dimensions.width}x${asset.dimensions.height} ${formatMessage({ id: `enums.units.${asset.dimensions.units}` })}` : ""}`,
    material: formatMessage({ id: `enums.material.${asset.material}` }),
  };

  return (
    <Fragment>
      {Object.values(subtitles)
        .filter(s => Boolean(s))
        .map(s => (
          <Typography key={s} variant="ralewayRegular" fontSize={18} lineHeight={"27px"}>
            {s}
          </Typography>
        ))}
    </Fragment>
  );
};
