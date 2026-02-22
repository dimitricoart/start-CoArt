export interface IApiError {
  status?: number;
  message?: string;
  getLocalizedValidationErrors?: () => Record<string, string>;
}

export function getLocalizedValidationErrors(err: unknown): Record<string, string> {
  if (err && typeof err === "object" && "getLocalizedValidationErrors" in err) {
    const fn = (err as IApiError).getLocalizedValidationErrors;
    if (typeof fn === "function") return fn();
  }
  if (err && typeof err === "object" && "errors" in err && typeof (err as { errors: unknown }).errors === "object") {
    return (err as { errors: Record<string, string> }).errors ?? {};
  }
  return {};
}
