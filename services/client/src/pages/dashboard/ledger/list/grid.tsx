import { FC } from "react";
import { Grid } from "@mui/material";

import type { ILedger } from "@framework/types";

import { LedgerCard } from "./card";

interface ILedgerGridProps {
  ledgers: Array<ILedger>;
  isDashBoard?: boolean;
}

export const LedgerGrid: FC<ILedgerGridProps> = props => {
  const { ledgers, isDashBoard } = props;
  return (
    <Grid container spacing={2} display="flex" justifyContent={isDashBoard ? "flex-start" : "center"}>
      {ledgers.map((ledger: ILedger) => (
        <Grid sx={{ display: "flex" }} key={ledger.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
          <LedgerCard ledger={ledger} />
        </Grid>
      ))}
    </Grid>
  );
};
