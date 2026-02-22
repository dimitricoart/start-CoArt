import { boolean, object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("form.validations.valueMissing"),
  isConfirmed: boolean().oneOf([true], "form.validations.valueMissing").required("form.validations.valueMissing"),
});
