import { ref, string, StringSchema } from "yup";
import { emailMaxLength, titleMinLength, titleMaxLength } from "@framework/constants";

function getHeadlessText(value: string): string {
  if (!value || typeof value !== "string") return "";
  try {
    const json = JSON.parse(value) as { root?: { children?: Array<{ text?: string }> } };
    const root = json?.root;
    if (!root?.children?.length) return "";
    return root.children.map(n => (n && "text" in n ? String(n.text ?? "") : "")).join("");
  } catch {
    return value;
  }
}

export const emailValidationSchema = string()
  .email("form.validations.badInput")
  .max(emailMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");

export const displayNameValidationSchema = string()
  .min(titleMinLength, "form.validations.tooShort")
  .max(titleMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");

export const urlValidationSchema = string()
  .url("form.validations.badInput")
  .required("form.validations.valueMissing");

export const titleValidationSchema = string()
  .min(titleMinLength, "form.validations.tooShort")
  .max(titleMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");

export const confirmValidationSchema = string()
  .required("form.validations.valueMissing")
  .oneOf([ref("password")], "form.validations.passwordMismatch");

const baseLexical = string().test("lexical", "form.validations.badInput", value => {
  if (value == null || value === "") return true;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
});

export const lexicalValidationSchema = baseLexical as StringSchema<string> & {
  lexicalMax(max: number, message: string): StringSchema<string>;
};

// Extend lexicalValidationSchema with lexicalMax
(lexicalValidationSchema as any).lexicalMax = function (max: number, message: string) {
  return this.test("lexicalMax", message, (value: string) => {
    if (value == null || value === "") return true;
    return getHeadlessText(value).length <= max;
  });
};
