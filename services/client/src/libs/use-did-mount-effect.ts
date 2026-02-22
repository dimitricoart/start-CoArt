import { useEffect, useRef } from "react";

export function useDidMountEffect(fn: React.EffectCallback, deps: React.DependencyList): void {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
