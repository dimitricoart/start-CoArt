import { array, object } from "yup";

import { urlValidationSchema } from "../../libs/yup-rules";

export const validationSchema = object().shape({
  photos: array()
    .of(
      object().shape({
        imageUrl: urlValidationSchema,
      }),
    )
    .min(1, "form.validations.valueMissing"),
});
