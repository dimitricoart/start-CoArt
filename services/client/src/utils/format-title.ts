function formatNumberWithSpaces(value: string | number): string {
  const raw = typeof value === "number" ? Math.trunc(value).toString() : value;
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatNumbersInString(input: string): string {
  return input.replace(/\d+/g, match => formatNumberWithSpaces(match));
}
