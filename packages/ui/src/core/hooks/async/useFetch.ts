import { useEffect, useRef, useState } from 'react';

export interface UseFetchState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  status: number | undefined;
}

export interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => void;
  abort: () => void;
}

export interface UseFetchOptions extends Omit<RequestInit, 'signal'> {
  /** Skip the request when false. Defaults to true. */
  enabled?: boolean;
  /** Parse the response body. Defaults to JSON. */
  parse?: 'json' | 'text' | 'blob' | 'arrayBuffer';
}

/**
 * Lightweight fetch wrapper with React state. Re-runs when `url` changes.
 * Aborts previous request on URL change or unmount.
 */
export const useFetch = <T = unknown>(
  url: string | null,
  options: UseFetchOptions = {},
): UseFetchReturn<T> => {
  const { enabled = true, parse = 'json', ...init } = options;
  const [state, setState] = useState<UseFetchState<T>>({
    data: undefined,
    error: undefined,
    loading: enabled && !!url,
    status: undefined,
  });
  const [tick, setTick] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url || !enabled) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setState((s) => ({ ...s, loading: true, error: undefined }));

    fetch(url, { ...init, signal: ctrl.signal })
      .then(async (res) => {
        const body = (await res[parse]()) as T;
        setState({ data: body, error: undefined, loading: false, status: res.status });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState((s) => ({
          ...s,
          error: err instanceof Error ? err : new Error(String(err)),
          loading: false,
        }));
      });

    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, enabled, tick]);

  return {
    ...state,
    refetch: () => setTick((t) => t + 1),
    abort: () => abortRef.current?.abort(),
  };
};
