import { FC } from "react";
import { Grid } from "@mui/material";

import type { IShowroom } from "@framework/types";

import { ShowroomCard } from "./card";

interface IShowroomListProps {
  showrooms: Array<IShowroom>;
}

export const ShowroomGrid: FC<IShowroomListProps> = props => {
  const { showrooms } = props;
  return (
    <Grid sx={{ width: "100%" }} container size={12} spacing={2.5} display="flex" justifyContent="center">
      {showrooms.map((showroom: IShowroom) => (
        <Grid display="flex" key={showroom.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
          <ShowroomCard showroom={showroom} />
        </Grid>
      ))}
    </Grid>
  );
};
