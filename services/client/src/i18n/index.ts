import { EnabledLanguages } from "@framework/constants";

import en from "./en.json";
import ru from "./ru.json";

export function flattenMessages(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, string> {
  return Object.keys(obj).reduce<Record<string, string>>((acc, key) => {
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(acc, flattenMessages(value as Record<string, unknown>, path));
    } else if (typeof value === "string") {
      acc[path] = value;
    }
    return acc;
  }, {});
}

export const i18n: Record<EnabledLanguages, Record<string, unknown>> = {
  [EnabledLanguages.EN]: en as Record<string, unknown>,
  [EnabledLanguages.RU]: ru as Record<string, unknown>,
};
