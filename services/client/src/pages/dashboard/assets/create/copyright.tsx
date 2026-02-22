import { Collapse, Grid } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

import { TextInput, DateInput } from "../../../../components/inputs";
import { useDidMountEffect } from "../../../../libs/use-did-mount-effect";

import { InputBox } from "../../../../components/input-box";
import { CalendarIcon } from "../../../../shared";

export const CopyrightInput = () => {
  const { setValue } = useFormContext();
  const isCopyright: boolean = useWatch({ name: "isCopyright" });

  useDidMountEffect(() => {
    if (!isCopyright) {
      setValue("artistName", "", { shouldValidate: true, shouldDirty: true });
    }
  }, [isCopyright]);

  return (
    <Collapse in={isCopyright}>
      <Grid container size={12} spacing={2} pt={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DateInput
            required
            views={["year"]}
            format="yyyy"
            slots={{
              openPickerIcon: CalendarIcon,
            }}
            textFieldSlotProps={{ required: isCopyright }}
            name="artworkCreatedAt"
            variant="outlined"
            minDate={new Date(1700, 0, 1)}
            maxDate={new Date()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputBox labelId="artistName" required={isCopyright}>
            <TextInput showLabel={false} name="artistName" variant="outlined" />
          </InputBox>
        </Grid>
      </Grid>
    </Collapse>
  );
};
