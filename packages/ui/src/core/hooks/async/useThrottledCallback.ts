import { useCallback, useEffect, useRef } from 'react';

/** Throttled callback wrapper. The function fires at most once per `interval` ms. */
export const useThrottledCallback = <TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  interval = 200,
): ((...args: TArgs) => void) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const lastCall = useRef(0);
  const trailing = useRef<number | null>(null);
  const lastArgs = useRef<TArgs | null>(null);

  useEffect(() => () => {
    if (trailing.current !== null) window.clearTimeout(trailing.current);
  }, []);

  return useCallback(
    (...args: TArgs) => {
      const now = Date.now();
      const elapsed = now - lastCall.current;
      lastArgs.current = args;
      if (elapsed >= interval) {
        lastCall.current = now;
        fnRef.current(...args);
      } else if (trailing.current === null) {
        trailing.current = window.setTimeout(() => {
          trailing.current = null;
          lastCall.current = Date.now();
          if (lastArgs.current) fnRef.current(...lastArgs.current);
        }, interval - elapsed);
      }
    },
    [interval],
  );
};
