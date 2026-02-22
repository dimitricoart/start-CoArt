import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { getHeadlessText } from "../../../utils/lexical";

interface ILexicalConstraints {
  minLength: number;
  maxLength: number;
}

@ValidatorConstraint()
export class LexicalValidator implements ValidatorConstraintInterface {
  private reason: string;

  public validate(value: string, args: ValidationArguments): boolean {
    this.reason = this.isValid(value, args);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private isValid(value: string, args: ValidationArguments): string {
    const { minLength, maxLength }: ILexicalConstraints = args.constraints[0];

    const text = getHeadlessText(value);

    if (maxLength > 0 && text.length > maxLength) {
      return "tooLong";
    }

    if (maxLength > 0 && text.length < minLength) {
      return "tooShort";
    }

    return "";
  }
}

export function IsLexical(
  constraints: Partial<ILexicalConstraints> = {},
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: Record<string, any>, propertyName: string | symbol): void => {
    registerDecorator({
      name: "IsLexical",
      target: object.constructor,
      propertyName: propertyName as string,
      constraints: [constraints],
      options: validationOptions,
      validator: LexicalValidator,
    });
  };
}
