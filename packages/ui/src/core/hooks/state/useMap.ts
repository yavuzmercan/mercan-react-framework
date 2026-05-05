import { useCallback, useState } from 'react';

export interface UseMapReturn<K, V> {
  map: Map<K, V>;
  set: (key: K, value: V) => void;
  setAll: (entries: Iterable<[K, V]>) => void;
  remove: (key: K) => void;
  has: (key: K) => boolean;
  get: (key: K) => V | undefined;
  clear: () => void;
  reset: () => void;
}

/** Map state with stable mutator methods. Each mutator produces a new Map. */
export const useMap = <K, V>(initial: Iterable<[K, V]> = []): UseMapReturn<K, V> => {
  const [map, setMap] = useState<Map<K, V>>(() => new Map(initial));

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  }, []);

  const setAll = useCallback((entries: Iterable<[K, V]>) => {
    setMap((prev) => {
      const next = new Map(prev);
      for (const [k, v] of entries) next.set(k, v);
      return next;
    });
  }, []);

  const remove = useCallback((key: K) => {
    setMap((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const clear = useCallback(() => setMap(new Map()), []);
  const reset = useCallback(() => setMap(new Map(initial)), [initial]);
  const has = useCallback((key: K) => map.has(key), [map]);
  const get = useCallback((key: K) => map.get(key), [map]);

  return { map, set, setAll, remove, has, get, clear, reset };
};
