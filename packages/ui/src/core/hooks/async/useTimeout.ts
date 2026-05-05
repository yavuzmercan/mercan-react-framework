import { useCallback, useEffect, useRef } from 'react';

/**
 * Declarative setTimeout. Pass null to cancel/disable.
 * Returns { reset } to start over and { clear } to cancel manually.
 */
export const useTimeout = (
  callback: () => void,
  delay: number | null,
): { reset: () => void; clear: () => void } => {
  const cb = useRef(callback);
  cb.current = callback;
  const timer = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clear();
    if (delay === null) return;
    timer.current = window.setTimeout(() => {
      timer.current = null;
      cb.current();
    }, delay);
  }, [delay, clear]);

  useEffect(() => {
    reset();
    return clear;
  }, [reset, clear]);

  return { reset, clear };
};
