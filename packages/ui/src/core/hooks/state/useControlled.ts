import { useCallback, useState } from 'react';

export interface UseControlledOptions<T> {
  controlled: T | undefined;
  defaultValue: T;
  onChange?: (value: T) => void;
}

/**
 * Bridge between controlled and uncontrolled component patterns.
 * If `controlled` is defined, uses it as the source of truth and reports changes
 * via `onChange`. Otherwise manages internal state.
 */
export const useControlled = <T>({
  controlled,
  defaultValue,
  onChange,
}: UseControlledOptions<T>): [T, (value: T) => void] => {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? (controlled as T) : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [value, setValue];
};
