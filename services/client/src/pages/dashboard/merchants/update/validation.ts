import { object } from "yup";

import { lexicalValidationSchema, titleValidationSchema, urlValidationSchema } from "../../../../libs/yup-rules";
import { maxAssetDescriptionLength } from "@framework/constants";

export const validationSchema = object().shape({
  title: titleValidationSchema,
  subtitle: lexicalValidationSchema,
  description: lexicalValidationSchema.lexicalMax(maxAssetDescriptionLength, "form.validations.rangeOverflow"),
  imageUrl: urlValidationSchema,
  backgroundImageUrl: urlValidationSchema,
});
