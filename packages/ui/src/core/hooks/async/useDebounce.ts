import { useEffect, useState } from 'react';

/** Debounced value — only updates `delay` ms after the last change. */
export const useDebounce = <T>(value: T, delay = 200): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return debounced;
};
