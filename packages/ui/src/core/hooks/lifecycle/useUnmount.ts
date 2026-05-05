import { useEffect, useRef } from 'react';

/** Runs the callback exactly once on unmount. */
export const useUnmount = (fn: () => void) => {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    return () => ref.current();
  }, []);
};
