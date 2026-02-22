import { object, string } from "yup";

import { confirmValidationSchema, displayNameValidationSchema, emailValidationSchema } from "../../../libs/yup-rules";
import { passwordMinLength } from "@framework/constants";

export const validationSchema = object().shape({
  email: emailValidationSchema,
  password: string().min(passwordMinLength, "form.validations.tooShort").required("form.validations.valueMissing"),
  confirm: confirmValidationSchema,
  displayName: displayNameValidationSchema,
});
