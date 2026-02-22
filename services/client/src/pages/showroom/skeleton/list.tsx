import { FC } from "react";
import { Grid } from "@mui/material";

import { SkeletonCard } from "./card";

export const Skeleton: FC = () => {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4, 5, 6].map(key => (
        <Grid key={key} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
  );
};
