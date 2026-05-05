import { useStorage, type UseStorageOptions } from './useStorage';

/**
 * Persisted state in `sessionStorage`. Cleared when the tab is closed.
 * Returns [value, setValue, remove].
 */
export const useSessionStorage = <T>(
  key: string,
  initialValue: T,
  options?: UseStorageOptions<T>,
) => useStorage<T>('session', key, initialValue, options);
