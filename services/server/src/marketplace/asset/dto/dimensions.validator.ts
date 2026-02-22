import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { AssetOrientation } from "@framework/types";

export function ValidateDimensions(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "ValidateDimensions",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const { orientation, width, height } = args.object as any;

          if (!orientation || !width || !height) return true;

          if (orientation === AssetOrientation.HORIZONTAL && height > width) return false;

          if (orientation === AssetOrientation.VERTICAL && width > height) return false;

          if (orientation === AssetOrientation.SQUARE && width !== height) return false;

          return true;
        },
        defaultMessage() {
          return "badInput";
        },
      },
    });
  };
}
