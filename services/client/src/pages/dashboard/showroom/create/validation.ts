import { object } from "yup";

import { lexicalValidationSchema, titleValidationSchema, urlValidationSchema } from "../../../../libs/yup-rules";

export const validationSchema = object().shape({
  title: titleValidationSchema,
  description: lexicalValidationSchema,
  imageUrl: urlValidationSchema,
});
