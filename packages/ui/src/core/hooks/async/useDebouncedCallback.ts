import { useCallback, useEffect, useMemo, useRef } from 'react';

export interface DebouncedFn<TArgs extends unknown[]> {
  (...args: TArgs): void;
  cancel: () => void;
  flush: () => void;
}

/**
 * Returns a stable debounced wrapper around `fn`. Only the last invocation in
 * the `delay` window runs. Includes `.cancel()` and `.flush()` methods.
 */
export const useDebouncedCallback = <TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay = 200,
): DebouncedFn<TArgs> => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const timer = useRef<number | null>(null);
  const lastArgs = useRef<TArgs | null>(null);

  const cancel = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    lastArgs.current = null;
  }, []);

  const flush = useCallback(() => {
    if (timer.current !== null && lastArgs.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
      const args = lastArgs.current;
      lastArgs.current = null;
      fnRef.current(...args);
    }
  }, []);

  const debounced = useMemo(() => {
    const handler = (...args: TArgs) => {
      lastArgs.current = args;
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        timer.current = null;
        const a = lastArgs.current;
        lastArgs.current = null;
        if (a) fnRef.current(...a);
      }, delay);
    };
    return Object.assign(handler, { cancel, flush }) as DebouncedFn<TArgs>;
  }, [delay, cancel, flush]);

  useEffect(() => () => cancel(), [cancel]);

  return debounced;
};
