import { useCallback, useEffect, useState } from 'react';

export interface UseStorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
  /** Sync this hook across tabs via the `storage` event. Defaults to true. */
  syncAcrossTabs?: boolean;
}

const defaultSerialize = JSON.stringify;
const defaultDeserialize = <T>(raw: string): T => JSON.parse(raw) as T;

const safeGetStorage = (kind: 'local' | 'session'): Storage | null => {
  if (typeof window === 'undefined') return null;
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
};

/** Internal helper used by useLocalStorage and useSessionStorage. */
export const useStorage = <T>(
  kind: 'local' | 'session',
  key: string,
  initialValue: T,
  options: UseStorageOptions<T> = {},
): [T, (value: T | ((prev: T) => T)) => void, () => void] => {
  const {
    serialize = defaultSerialize as (v: T) => string,
    deserialize = defaultDeserialize as (s: string) => T,
    syncAcrossTabs = true,
  } = options;

  const read = useCallback((): T => {
    const storage = safeGetStorage(kind);
    if (!storage) return initialValue;
    const raw = storage.getItem(key);
    if (raw === null) return initialValue;
    try {
      return deserialize(raw);
    } catch {
      return initialValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, key]);

  const [value, setValue] = useState<T>(read);

  const write = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        const storage = safeGetStorage(kind);
        if (storage) {
          try {
            storage.setItem(key, serialize(resolved));
          } catch {
            /* quota or disabled */
          }
        }
        return resolved;
      });
    },
    [kind, key, serialize],
  );

  const remove = useCallback(() => {
    const storage = safeGetStorage(kind);
    if (storage) storage.removeItem(key);
    setValue(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, key]);

  // Cross-tab sync (localStorage only; sessionStorage doesn't fire in other tabs)
  useEffect(() => {
    if (!syncAcrossTabs || kind !== 'local' || typeof window === 'undefined') return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      if (e.newValue === null) {
        setValue(initialValue);
        return;
      }
      try {
        setValue(deserialize(e.newValue));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, key, syncAcrossTabs]);

  return [value, write, remove];
};
