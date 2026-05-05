import { useEffect, useRef } from 'react';

/** Returns the value from the previous render. Returns undefined on first render. */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
