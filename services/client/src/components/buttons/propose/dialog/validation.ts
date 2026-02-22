import { string, object } from "yup";

import { emailValidationSchema } from "../../../../libs/yup-rules";

export const validationSchema = object().shape({
  email: emailValidationSchema,
  message: string()
    .required("form.validations.valueMissing")
    .min(100, "form.validations.tooShort")
    .max(1000, "form.validations.rangeUnderflow"),
});
