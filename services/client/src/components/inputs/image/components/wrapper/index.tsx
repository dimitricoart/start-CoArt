import { FC, PropsWithChildren } from "react";

import { StyledPlaceholder, StylesBackgroundSkeleton } from "../../styled";
import { ImageInputMode } from "../../types";

interface IFieldWrapperProps {
  isLoading: boolean;
  mode: ImageInputMode;
  error?: boolean;
}

export const FieldWrapper: FC<PropsWithChildren<IFieldWrapperProps>> = ({ isLoading, mode, error, children }) => {
  if (isLoading) {
    return <StylesBackgroundSkeleton $mode={mode} variant="rectangular" animation="wave" />;
  }

  return (
    <StyledPlaceholder className={`${error ? "MuiError" : ""}`} $mode={mode}>
      {children}
    </StyledPlaceholder>
  );
};
