import { array, boolean, mixed, number, object, string } from "yup";

import {
  lexicalValidationSchema,
  titleValidationSchema,
  urlValidationSchema,
  displayNameValidationSchema,
} from "../../../../libs/yup-rules";
import {
  AssetOrientation,
  AssetType,
  CategoryType,
  MaterialType,
  StyleType,
  SubjectType,
  UnitType,
} from "@framework/types";
import { titleMaxLength, titleMinLength } from "@framework/constants";
import { maxAssetDescriptionLength } from "@framework/constants";

import { orientations } from "../../../asset/components/orientation/constants";

declare module "yup" {
  // eslint-disable-next-line
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    lexicalMax(value: number, errorMessage: string): this;
  }
}

export const validationSchema = object().shape({
  title: titleValidationSchema,
  description: lexicalValidationSchema.lexicalMax(maxAssetDescriptionLength, "form.validations.rangeOverflow"),

  assetType: mixed<AssetType>().oneOf(Object.values(AssetType)).required("form.validations.valueMissing"),
  category: mixed<CategoryType>().oneOf(Object.values(CategoryType)).required("form.validations.valueMissing"),
  subject: mixed<SubjectType>().oneOf(Object.values(SubjectType)).required("form.validations.valueMissing"),
  style: mixed<StyleType>().oneOf(Object.values(StyleType)).required("form.validations.valueMissing"),
  material: mixed<MaterialType>().oneOf(Object.values(MaterialType)).required("form.validations.valueMissing"),
  isConfirmed: boolean().oneOf([true], "form.validations.valueMissing").required("form.validations.valueMissing"),
  artistName: string().when("isCopyright", ([isCopyright], schema) => {
    return isCopyright ? displayNameValidationSchema : schema.notRequired();
  }),

  artworkCreatedAt: string().when("isCopyright", ([isCopyright], schema) => {
    return isCopyright
      ? schema.datetime("form.validations.badInput").required("form.validations.valueMissing")
      : schema.notRequired();
  }),

  dimensions: object().when("assetType", ([assetType], _) => {
    return assetType === AssetType.PHYSICAL
      ? object().shape({
          orientation: string()
            .oneOf(orientations, "form.validations.badInput")
            .required("form.validations.valueMissing"),
          height: number()
            .transform((value: string | number, originalValue: string | number) => {
              return originalValue === "" ? undefined : value;
            })
            .min(1, "form.validations.valueMissing")
            .required("form.validations.valueMissing")
            .test("height-max-2-decimals", "form.validations.maxTwoDecimals", function (_value) {
              const { originalValue } = this as any;
              const raw = String(originalValue ?? "").trim();

              if (raw === "") return true;

              const m = /[.,](\d+)$/.exec(raw);
              if (!m) return true;
              return m[1].length <= 2;
            })
            .test("height-dimension-check", "form.validations.badInput", function (height) {
              const { width, orientation } = this.parent;
              if (orientation === AssetOrientation.HORIZONTAL) {
                return height < width;
              }
              if (orientation === AssetOrientation.VERTICAL) {
                return height > width;
              }
              if (orientation === AssetOrientation.SQUARE) {
                return height === width;
              }
              return true;
            }),
          width: number()
            .transform((value: string | number, originalValue: string | number) => {
              return originalValue === "" ? undefined : value;
            })
            .min(1, "form.validations.valueMissing")
            .required("form.validations.valueMissing")
            .test("width-max-2-decimals", "form.validations.maxTwoDecimals", function (_value) {
              const { originalValue } = this as any;
              const raw = String(originalValue ?? "").trim();

              if (raw === "") return true;

              const m = /[.,](\d+)$/.exec(raw);
              if (!m) return true;
              return m[1].length <= 2;
            })
            .test("width-dimension-check", "form.validations.badInput", function (width) {
              const { height, orientation } = this.parent;
              if (orientation === AssetOrientation.HORIZONTAL) {
                return width > height;
              }
              if (orientation === AssetOrientation.VERTICAL) {
                return width < height;
              }
              if (orientation === AssetOrientation.SQUARE) {
                return width === height;
              }
              return true;
            }),
          depth: number()
            .transform((value: string | number, originalValue: string | number) => {
              return originalValue === "" ? undefined : value;
            })
            .min(1, "form.validations.valueMissing")
            .required("form.validations.valueMissing")
            .test("depth-max-2-decimals", "form.validations.maxTwoDecimals", function (_value) {
              const { originalValue } = this as any;
              const raw = String(originalValue ?? "").trim();

              if (raw === "") return true;

              const m = /[.,](\d+)$/.exec(raw);
              if (!m) return true;
              return m[1].length <= 2;
            }),
          units: mixed().oneOf(Object.values(UnitType)).required("form.validations.valueMissing"),
        })
      : object().shape({
          orientation: string().notRequired(),
          height: number().notRequired(),
          width: number().notRequired(),
          depth: number().notRequired(),
          units: mixed().notRequired(),
        });
  }),
  photos: array()
    .of(
      object().shape({
        imageUrl: urlValidationSchema,
        caption: string()
          .min(titleMinLength, "form.validations.tooShort")
          .max(titleMaxLength, "form.validations.tooLong"),
      }),
    )
    .min(4, "form.validations.valueMissing")
    .max(10, "form.validations.rangeUnderflow"),

  documents: array()
    .of(
      object().shape({
        fileUrl: urlValidationSchema,
        caption: titleValidationSchema,
      }),
    )
    .min(0, "form.validations.valueMissing")
    .max(10, "form.validations.rangeUnderflow"),

  imageUrl: urlValidationSchema,
});
