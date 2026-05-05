import { useCallback, useState } from 'react';

export interface UseSetReturn<T> {
  set: Set<T>;
  add: (value: T) => void;
  remove: (value: T) => void;
  toggle: (value: T) => void;
  has: (value: T) => boolean;
  clear: () => void;
  reset: () => void;
}

/** Set state with stable mutator methods. Each mutator produces a new Set. */
export const useSet = <T>(initial: Iterable<T> = []): UseSetReturn<T> => {
  const [set, setState] = useState<Set<T>>(() => new Set(initial));

  const add = useCallback((value: T) => {
    setState((prev) => {
      if (prev.has(value)) return prev;
      const next = new Set(prev);
      next.add(value);
      return next;
    });
  }, []);

  const remove = useCallback((value: T) => {
    setState((prev) => {
      if (!prev.has(value)) return prev;
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
  }, []);

  const toggle = useCallback((value: T) => {
    setState((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const has = useCallback((value: T) => set.has(value), [set]);
  const clear = useCallback(() => setState(new Set()), []);
  const reset = useCallback(() => setState(new Set(initial)), [initial]);

  return { set, add, remove, toggle, has, clear, reset };
};
