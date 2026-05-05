import { useStorage, type UseStorageOptions } from './useStorage';

/**
 * Persisted state in `localStorage`. Survives page reload, syncs across tabs.
 * Returns [value, setValue, remove].
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options?: UseStorageOptions<T>,
) => useStorage<T>('local', key, initialValue, options);
