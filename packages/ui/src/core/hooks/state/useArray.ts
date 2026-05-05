import { useCallback, useState } from 'react';

export interface UseArrayReturn<T> {
  array: T[];
  set: (next: T[]) => void;
  push: (...items: T[]) => void;
  pop: () => T | undefined;
  shift: () => T | undefined;
  unshift: (...items: T[]) => void;
  removeAt: (index: number) => void;
  insertAt: (index: number, item: T) => void;
  replaceAt: (index: number, item: T) => void;
  clear: () => void;
  filter: (fn: (item: T, index: number) => boolean) => void;
  reset: () => void;
}

/** Array state with stable mutator methods. Methods produce new arrays (immutable). */
export const useArray = <T>(initial: T[] = []): UseArrayReturn<T> => {
  const [array, set] = useState<T[]>(initial);

  const push = useCallback((...items: T[]) => set((a) => [...a, ...items]), []);
  const pop = useCallback(() => {
    let popped: T | undefined;
    set((a) => {
      if (a.length === 0) return a;
      popped = a[a.length - 1];
      return a.slice(0, -1);
    });
    return popped;
  }, []);
  const shift = useCallback(() => {
    let shifted: T | undefined;
    set((a) => {
      if (a.length === 0) return a;
      shifted = a[0];
      return a.slice(1);
    });
    return shifted;
  }, []);
  const unshift = useCallback((...items: T[]) => set((a) => [...items, ...a]), []);
  const removeAt = useCallback((i: number) => set((a) => a.filter((_, idx) => idx !== i)), []);
  const insertAt = useCallback((i: number, item: T) =>
    set((a) => [...a.slice(0, i), item, ...a.slice(i)]), []);
  const replaceAt = useCallback((i: number, item: T) =>
    set((a) => a.map((v, idx) => (idx === i ? item : v))), []);
  const clear = useCallback(() => set([]), []);
  const filter = useCallback((fn: (item: T, i: number) => boolean) =>
    set((a) => a.filter(fn)), []);
  const reset = useCallback(() => set(initial), [initial]);

  return { array, set, push, pop, shift, unshift, removeAt, insertAt, replaceAt, clear, filter, reset };
};
