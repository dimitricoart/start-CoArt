import { number, object } from "yup";

export const validationSchema = object().shape({
  price: number()
    .transform((value, _) => {
      return typeof value === "number" && !Number.isNaN(value) ? value : 0;
    })
    .integer("form.validations.badInput")
    .required("form.validations.valueMissing"),
});
