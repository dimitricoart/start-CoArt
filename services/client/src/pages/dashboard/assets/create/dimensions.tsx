import { FC, useCallback, useEffect } from "react";
import { FieldValues, useFormContext, useWatch, WatchObserver } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Collapse, Grid, Typography } from "@mui/material";

import { NumberInput, SelectInput } from "../../../../components/inputs";
import { AssetType, UnitType } from "@framework/types";

import { OrientationInput } from "../../../asset/components/orientation";
import { InputBox } from "../../../../components/input-box";
import { selectInputLabelProps } from "../../../../components/styled";

export interface IVrfConsumerInputDto {
  contractId?: number;
}

export const DimensionsInput: FC<IVrfConsumerInputDto> = () => {
  const form = useFormContext();

  const assetType: AssetType = useWatch({ name: "assetType" });

  const formObserver: WatchObserver<FieldValues> = useCallback(
    (values, info) => {
      if (info.type !== "change") return;

      const { name } = info;
      const { width, height } = values.dimensions || {};

      const isWidthValid = width > 0;
      const isHeightValid = height > 0;

      const fieldsToTrigger: string[] = [];

      if (name === "dimensions.width" && isWidthValid) {
        fieldsToTrigger.push("dimensions.height");
      }
      if (name === "dimensions.height" && isHeightValid) {
        fieldsToTrigger.push("dimensions.width");
      }
      if (name === "dimensions.orientation" && isWidthValid && isHeightValid) {
        fieldsToTrigger.push("dimensions.width", "dimensions.height");
      }

      const uniqueFields = [...new Set(fieldsToTrigger)];
      uniqueFields.forEach(field => void form.trigger(field));
    },
    [form],
  );

  useEffect(() => {
    const subscription = form.watch(formObserver);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Collapse in={assetType === AssetType.PHYSICAL}>
      <Grid container size={12} mt={4} display="flex" flexDirection="column">
        <Typography variant="ralewayRegular" fontSize={20} color="custom.typography.black" mb={4}>
          <FormattedMessage id="pages.dashboard.assets.create.dimensions" />
        </Typography>

        <Grid container size={12} mb={4} spacing={5}>
          <Grid size={{ sm: 12, md: 6 }}>
            <OrientationInput name="dimensions.orientation" />
          </Grid>
          <Grid size={{ sm: 12, md: 6 }} />
        </Grid>

        <Grid container size={12} mb={3.75} spacing={5}>
          <InputBox required size={{ sm: 12, md: 6 }} labelId="width">
            <NumberInput showLabel={false} name="dimensions.width" variant="outlined" />
          </InputBox>
          <InputBox required size={{ sm: 12, md: 6 }} labelId="height">
            <NumberInput showLabel={false} name="dimensions.height" variant="outlined" />
          </InputBox>
        </Grid>

        <Grid container size={12} spacing={5}>
          <InputBox required size={{ sm: 12, md: 6 }} labelId="depth">
            <NumberInput showLabel={false} name="dimensions.depth" variant="outlined" />
          </InputBox>
          <Grid size={{ sm: 12, md: 6 }}>
            <SelectInput
              required
              InputLabelProps={selectInputLabelProps}
              name="dimensions.units"
              variant="outlined"
              options={UnitType}
            />
          </Grid>
        </Grid>
      </Grid>
    </Collapse>
  );
};
