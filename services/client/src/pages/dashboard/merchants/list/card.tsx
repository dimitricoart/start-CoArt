import { FC } from "react";
import { Link as RouterLink } from "react-router";
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import { IMerchant } from "@framework/types";

import { ROUTES } from "../../../../routes/routes";
import { StyledCardRoot } from "../../../../components/styled";

interface IMerchantCardProps {
  merchant: IMerchant;
  showDescription?: boolean;
}

export const MerchantCard: FC<IMerchantCardProps> = props => {
  const { merchant } = props;

  return (
    <StyledCardRoot elevation={0}>
      <CardActionArea
        component={RouterLink}
        to={ROUTES.DASHBOARD_MERCHANTS_UPDATE.replace(":merchantId", merchant.id.toString())}
      >
        <CardMedia sx={{ height: 250 }} image={merchant.imageUrl} title={merchant.title} />
        <CardContent>
          <Typography variant="ralewayMedium" fontSize={24} component="h4" mb={0.75}>
            {merchant.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCardRoot>
  );
};
