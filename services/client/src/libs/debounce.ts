import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(t);
  }, [value, delay]);

  return debouncedValue;
}
