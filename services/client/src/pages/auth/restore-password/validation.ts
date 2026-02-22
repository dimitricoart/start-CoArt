import { object, string } from "yup";

import { confirmValidationSchema } from "../../../libs/yup-rules";
import { passwordMinLength } from "@framework/constants";

export const validationSchema = object().shape({
  password: string().min(passwordMinLength, "form.validations.tooShort").required("form.validations.valueMissing"),
  confirm: confirmValidationSchema,
});
