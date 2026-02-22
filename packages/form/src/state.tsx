import { FC } from "react";
import { useFormContext } from "react-hook-form";

export const FormState: FC = () => {
  const { formState } = useFormContext();

  console.info({ formState });

  return null;
};
