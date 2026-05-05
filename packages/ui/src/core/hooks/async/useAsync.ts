import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseAsyncState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
}

export interface UseAsyncReturn<TArgs extends unknown[], T> extends UseAsyncState<T> {
  run: (...args: TArgs) => Promise<T>;
  reset: () => void;
}

/**
 * Wraps an async function with loading/error/data state. Handles unmount-safety.
 * Pass `immediate: true` to run on mount.
 */
export const useAsync = <TArgs extends unknown[], T>(
  fn: (...args: TArgs) => Promise<T>,
  options: { immediate?: boolean; immediateArgs?: TArgs } = {},
): UseAsyncReturn<TArgs, T> => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: undefined,
    error: undefined,
    loading: !!options.immediate,
  });
  const mounted = useRef(true);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => () => {
    mounted.current = false;
  }, []);

  const run = useCallback(async (...args: TArgs): Promise<T> => {
    setState((s) => ({ ...s, loading: true, error: undefined }));
    try {
      const data = await fnRef.current(...args);
      if (mounted.current) setState({ data, error: undefined, loading: false });
      return data;
    } catch (err) {
      if (mounted.current) {
        setState({
          data: undefined,
          error: err instanceof Error ? err : new Error(String(err)),
          loading: false,
        });
      }
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: undefined, error: undefined, loading: false });
  }, []);

  useEffect(() => {
    if (options.immediate) {
      run(...((options.immediateArgs ?? []) as TArgs)).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, run, reset };
};
