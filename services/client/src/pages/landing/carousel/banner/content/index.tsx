import { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router";

import { VolumetricButton } from "../../../../../components/buttons";
import { StyledBannerContent, StyledBannerContentButtons } from "../styled";
import { IBanner } from "../../interface";
import { ROUTES } from "../../../../../routes/routes";

export interface IBannerContentProps {
  banner: IBanner;
}

export const BannerContent: FC<IBannerContentProps> = ({ banner }) => {
  return (
    <StyledBannerContent>
      <Typography className="Banner-ContentTitle">
        <FormattedMessage
          id={banner.title}
          values={{
            i: value => <i className="Banner-ItalicBoldText">{value}</i>,
            br: () => <br />,
          }}
        />
      </Typography>
      <Typography className="Banner-ContentDescription">
        {
          <FormattedMessage
            id={banner.description}
            values={{
              i: value => <i className="Banner-ItalicBoldText">{value}</i>,
              br: () => <br />,
            }}
          />
        }
      </Typography>
      <StyledBannerContentButtons container size={12} spacing={{ sm: 3, lg: 2, xl: 2 }}>
        <Grid size={{ md: 12, lg: 6, xl: 6 }}>
          <VolumetricButton
            text={"pages.landing.hero.viewAsset"}
            to={ROUTES.LEDGER_VIEW.replace(":ledgerId", "bf06afc1-f0b2-4f65-bc90-6fc8e2224b39")}
            component={RouterLink}
          />
        </Grid>
        <Grid size={{ md: 12, lg: 6, xl: 6 }}>
          <VolumetricButton
            customColor="white"
            text={"pages.landing.hero.viewShowroom"}
            to={`${ROUTES.MERCHANT_VIEW.replace(":merchantId", "59530569-c971-41f0-895e-d150b4234352")}?take=30&skip=0`}
            component={RouterLink}
          />
        </Grid>
      </StyledBannerContentButtons>
    </StyledBannerContent>
  );
};
