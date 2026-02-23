import { FC } from "react";
import { Grid } from "@mui/material";

import type { IShowroom } from "@framework/types";

import { ShowroomCard } from "./card";

interface IMerchantGridProps {
  showrooms?: Array<IShowroom> | null;
  isDashBoard?: boolean;
}

export const MerchantGrid: FC<IMerchantGridProps> = props => {
  const { showrooms = [], isDashBoard } = props;
  const list = Array.isArray(showrooms) ? showrooms : [];
  return (
    <Grid container spacing={2} display="flex" justifyContent={isDashBoard ? "flex-start" : "center"}>
      {list.map((showroom: IShowroom) => (
        <Grid sx={{ display: "flex" }} key={showroom.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
          <ShowroomCard showroom={showroom} />
        </Grid>
      ))}
    </Grid>
  );
};
