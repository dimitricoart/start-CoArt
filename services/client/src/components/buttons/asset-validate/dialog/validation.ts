import { string, object } from "yup";

export const validationSchema = object().shape({
  message: string()
    .min(1, "form.validations.valueMissing")
    .min(100, "form.validations.tooShort")
    .max(1000, "form.validations.rangeUnderflow"),
});
