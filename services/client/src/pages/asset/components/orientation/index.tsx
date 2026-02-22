import { FC, ReactElement } from "react";
import { useWatch } from "react-hook-form";

import { AssetOrientation } from "@framework/types";
import { SelectInput } from "../../../../components/inputs";

import { BpIcon } from "./styled";
import { selectInputLabelProps } from "../../../../components/styled";

interface IOrientationInputProps {
  name: string;
  label?: string | number | ReactElement;
}

export const OrientationInput: FC<IOrientationInputProps> = props => {
  const { name } = props;

  const value: AssetOrientation = useWatch({ name });

  return (
    <SelectInput
      required
      startAdornment={
        <BpIcon
          $orientation={
            // TODO should not be null!
            value || AssetOrientation.SQUARE
          }
        />
      }
      InputLabelProps={selectInputLabelProps}
      name={name}
      options={AssetOrientation}
      variant="outlined"
    />
  );
};
