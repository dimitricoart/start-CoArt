import { FC } from "react";
import { Grid } from "@mui/material";

import type { IProvenance } from "@framework/types";

import { ProvenanceCard } from "./card";

interface IProvenanceListProps {
  provenance: Array<IProvenance>;
  isDashBoard?: boolean;
}

export const ProvenanceGrid: FC<IProvenanceListProps> = props => {
  const { provenance, isDashBoard } = props;
  return (
    <Grid
      sx={{ width: "100%" }}
      container
      spacing={2.5}
      display="flex"
      justifyContent={isDashBoard ? "flex-start" : "center"}
    >
      {provenance.map((provenance: IProvenance) => (
        <Grid display="flex" key={provenance.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
          <ProvenanceCard provenance={provenance} />
        </Grid>
      ))}
    </Grid>
  );
};
