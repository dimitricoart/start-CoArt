import { FC } from "react";
import { Link as RouterLink } from "react-router";
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import { ILedger } from "@framework/types";

import { ROUTES } from "../../../../routes/routes";
import { StyledCardRoot } from "../../../../components/styled";
import { formatNumbersInString } from "../../../../utils/format-title";

interface ILedgerCardProps {
  ledger: ILedger;
  showDescription?: boolean;
}

export const LedgerCard: FC<ILedgerCardProps> = props => {
  const { ledger } = props;

  return (
    <StyledCardRoot elevation={0}>
      <CardActionArea component={RouterLink} to={ROUTES.LEDGER_VIEW.replace(":ledgerId", ledger.id.toString())}>
        <CardMedia sx={{ height: 250 }} image={ledger.asset?.imageUrl} title={ledger.asset?.title} />
        <CardContent>
          <Typography variant="ralewayMedium" fontSize={24} component="h4" mb={0.75}>
            {formatNumbersInString(ledger.asset!.title)}
          </Typography>
          <Typography variant="ralewayMedium" fontSize={18} color="custom.typography.semiGrey" component="h6">
            {ledger.asset?.artistName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCardRoot>
  );
};
