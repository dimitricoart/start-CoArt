import { FC } from "react";
import { Grid } from "@mui/material";

import type { IMerchant } from "@framework/types";

import { MerchantCard } from "./card";

interface IMerchantListProps {
  merchants: Array<IMerchant>;
}

export const MerchantGrid: FC<IMerchantListProps> = props => {
  const { merchants } = props;
  return (
    <Grid sx={{ width: "100%" }} container size={12} spacing={2.5} display="flex" justifyContent="center">
      {merchants.map((merchant: IMerchant) => (
        <Grid display="flex" key={merchant.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
          <MerchantCard merchant={merchant} />
        </Grid>
      ))}
    </Grid>
  );
};
