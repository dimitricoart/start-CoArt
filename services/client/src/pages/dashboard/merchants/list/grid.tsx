import { FC } from "react";
import { Grid } from "@mui/material";

import type { IMerchant } from "@framework/types";

import { MerchantCard } from "./card";

interface IMerchantGridProps {
  merchants: Array<IMerchant>;
  isDashBoard?: boolean;
}

export const MerchantGrid: FC<IMerchantGridProps> = props => {
  const { merchants, isDashBoard } = props;
  return (
    <Grid container spacing={2} display="flex" justifyContent={isDashBoard ? "flex-start" : "center"}>
      {merchants.map((merchant: IMerchant) => (
        <Grid sx={{ display: "flex" }} key={merchant.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
          <MerchantCard merchant={merchant} />
        </Grid>
      ))}
    </Grid>
  );
};
