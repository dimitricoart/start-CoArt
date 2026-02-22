import { object, string } from "yup";

import { EnabledLanguages } from "@framework/constants";
import { displayNameValidationSchema, emailValidationSchema, urlValidationSchema } from "../../libs/yup-rules";

export const validationSchema = object().shape({
  email: emailValidationSchema,
  displayName: displayNameValidationSchema,
  language: string().oneOf(Object.values(EnabledLanguages)).required("form.validations.valueMissing"),
  imageUrl: urlValidationSchema,
});
