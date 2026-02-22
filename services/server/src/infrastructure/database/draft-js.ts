import { Type } from "@mikro-orm/core";

export class DraftJSType extends Type<string, Record<string, any>> {
  convertToDatabaseValue(value: string): Record<string, any> {
    return JSON.parse(value);
  }

  convertToJSValue(value: Record<string, any>): string {
    return JSON.stringify(value);
  }
}
