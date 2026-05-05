import { useCallback, useState } from 'react';

/**
 * Toggle a boolean. The setter accepts a value to force, or no argument to flip.
 * Returns [value, toggle].
 */
export const useToggle = (initial = false): [boolean, (next?: boolean) => void] => {
  const [value, setValue] = useState(initial);
  const toggle = useCallback((next?: boolean) => {
    setValue((v) => (typeof next === 'boolean' ? next : !v));
  }, []);
  return [value, toggle];
};
