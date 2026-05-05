import { useCallback, useState } from 'react';

export interface UseBooleanReturn {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  set: (v: boolean) => void;
}

/** Boolean state with named methods — clearer than useState<boolean>() at the call site. */
export const useBoolean = (initial = false): UseBooleanReturn => {
  const [value, set] = useState(initial);
  const setTrue = useCallback(() => set(true), []);
  const setFalse = useCallback(() => set(false), []);
  const toggle = useCallback(() => set((v) => !v), []);
  return { value, setTrue, setFalse, toggle, set };
};
