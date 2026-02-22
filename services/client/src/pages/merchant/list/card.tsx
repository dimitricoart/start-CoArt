import { FC } from "react";
import { Link as RouterLink } from "react-router";
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import type { IMerchant } from "@framework/types";
import { Display } from "../../../components/lexical-display";

import { ROUTES } from "../../../routes/routes";
import { StyledCardRoot } from "../../../components/styled";

interface IMerchantCardProps {
  merchant: IMerchant;
}

export const MerchantCard: FC<IMerchantCardProps> = props => {
  const { merchant } = props;

  return (
    <StyledCardRoot elevation={0}>
      <CardActionArea component={RouterLink} to={ROUTES.MERCHANT_VIEW.replace(":merchantId", merchant.id.toString())}>
        <CardMedia sx={{ height: 250 }} image={merchant.imageUrl} title={merchant.title} />
        <CardContent sx={{ height: "calc(100% - 250px)" }}>
          <Typography variant="ralewayMedium" color="custom.typography.black" component="h5" pr={2}>
            {merchant.title}
          </Typography>
          <Display data={merchant?.subtitle} />
        </CardContent>
      </CardActionArea>
    </StyledCardRoot>
  );
};
