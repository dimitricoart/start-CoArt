import { FC } from "react";
import { useMediaQuery } from "@mui/material";

import { IBanner } from "../interface";
import { StyledBannerImage, StyledBannerRoot } from "./styled";
import { BannerContent } from "./content";

export interface IBannerProps {
  banner: IBanner;
}

export const Banner: FC<IBannerProps> = props => {
  const { banner } = props;
  const isLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
  return (
    <StyledBannerRoot>
      {!isLg && <BannerContent banner={banner} />}
      <StyledBannerImage draggable={false} $image={banner.imageUrl} />
    </StyledBannerRoot>
  );
};
