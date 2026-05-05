import { useEffect, useRef, type DependencyList, type EffectCallback } from 'react';

/** Like useEffect, but skips the initial render. */
export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
