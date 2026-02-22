import React from "react";
import { Grid, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { AssetType, CategoryType, MaterialType, StyleType, SubjectType } from "@framework/types";
import { SelectInput } from "../../../../components/inputs";

import { selectInputLabelProps } from "../../../../components/styled";

export const Specifications = () => {
  return (
    <Grid container size={12} mt={4}>
      <Typography variant="ralewayRegular" fontSize={20} color="custom.typography.black" mb={4}>
        <FormattedMessage id="pages.dashboard.assets.create.specifications" />
      </Typography>

      <Grid container size={12} spacing={3}>
        <Grid size={{ xs: 12 }}>
          <SelectInput
            required
            InputLabelProps={selectInputLabelProps}
            name="assetType"
            options={AssetType}
            variant="outlined"
          />
        </Grid>
        <Grid container size={12} spacing={5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SelectInput
              required
              InputLabelProps={selectInputLabelProps}
              name="category"
              options={CategoryType}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SelectInput
              required
              InputLabelProps={selectInputLabelProps}
              name="subject"
              options={SubjectType}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container size={12} spacing={5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SelectInput
              required
              InputLabelProps={selectInputLabelProps}
              name="style"
              options={StyleType}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SelectInput
              required
              InputLabelProps={selectInputLabelProps}
              name="material"
              options={MaterialType}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
