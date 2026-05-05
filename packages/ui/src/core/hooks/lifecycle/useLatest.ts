import { useRef, type MutableRefObject } from 'react';

/** Ref that always holds the latest value passed in. Useful for avoiding stale closures in effects. */
export const useLatest = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};
