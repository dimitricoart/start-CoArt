import { Type } from "@mikro-orm/core";

export class Uint256Type extends Type<string, bigint> {
  convertToDatabaseValue(value: string): bigint {
    return BigInt(value);
  }

  convertToJSValue(value: bigint): string {
    return value.toString();
  }
}
