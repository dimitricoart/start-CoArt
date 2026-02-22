import { object } from "yup";

import { emailValidationSchema } from "../../../libs/yup-rules";

export const validationSchema = object().shape({
  email: emailValidationSchema,
});
