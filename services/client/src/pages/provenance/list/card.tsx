import { FC } from "react";
import { Link as RouterLink } from "react-router";
import { CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { FormattedNumber } from "react-intl";

import { IProvenance } from "@framework/types";

import { ROUTES } from "../../../routes/routes";
import { StyledCardRoot } from "../../../components/styled";
import { formatNumbersInString } from "../../../utils/format-title";

interface IProvenanceCardProps {
  provenance: IProvenance;
}

export const ProvenanceCard: FC<IProvenanceCardProps> = props => {
  const { provenance } = props;

  return (
    <StyledCardRoot elevation={0}>
      <CardActionArea
        component={RouterLink}
        to={ROUTES.ASSET_VIEW.replace(":assetId", provenance.asset!.id.toString())}
      >
        <CardMedia sx={{ height: 250 }} image={provenance.asset!.imageUrl} title={provenance.asset!.title} />
        <CardContent sx={{ height: "calc(100% - 250px)", justifyContent: "space-between" }}>
          <Stack>
            <Typography variant="ralewayMedium" color="custom.typography.black" component="h5" pr={2}>
              {formatNumbersInString(provenance.asset!.title)}
            </Typography>
            <Typography
              variant="ralewayMedium"
              fontSize={18}
              lineHeight="26px"
              color="custom.typography.semiGrey"
              component="p"
            >
              {provenance.asset!.artistName}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
            <Typography
              variant="playfairSemibold"
              fontWeight={700}
              fontSize={28}
              lineHeight="38px"
              color="custom.orange.700"
              component="p"
            >
              <FormattedNumber
                value={provenance.price}
                style="currency"
                currency="EUR"
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            </Typography>
            <Typography
              variant="ralewayMedium"
              fontSize={15}
              lineHeight="26px"
              color="custom.typography.semiGrey"
              component="p"
            >
              {format(new Date(provenance.createdAt), "dd.MM.yy")}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </StyledCardRoot>
  );
};
