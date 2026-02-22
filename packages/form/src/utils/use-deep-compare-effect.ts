import { useEffect, useRef } from "react";

export function useDeepCompareEffect(effect: React.EffectCallback, deps: React.DependencyList): void {
  const ref = useRef<React.DependencyList>(deps);
  const lastDeps = ref.current;
  if (
    lastDeps.length !== deps.length ||
    deps.some((d, i) => d !== lastDeps[i])
  ) {
    ref.current = deps;
  }
  const stableDeps = ref.current;
  useEffect(effect, stableDeps);
}
