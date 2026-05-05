import { useCallback, useState } from 'react';

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export interface UseCounterReturn {
  count: number;
  increment: (by?: number) => void;
  decrement: (by?: number) => void;
  set: (value: number) => void;
  reset: () => void;
}

const clamp = (n: number, min?: number, max?: number) => {
  let v = n;
  if (min !== undefined) v = Math.max(min, v);
  if (max !== undefined) v = Math.min(max, v);
  return v;
};

/** Numeric counter with increment/decrement/reset and optional bounds. */
export const useCounter = (initial = 0, options: UseCounterOptions = {}): UseCounterReturn => {
  const { min, max } = options;
  const [count, setCount] = useState(() => clamp(initial, min, max));

  const set = useCallback((v: number) => setCount(clamp(v, min, max)), [min, max]);
  const increment = useCallback((by = 1) => setCount((c) => clamp(c + by, min, max)), [min, max]);
  const decrement = useCallback((by = 1) => setCount((c) => clamp(c - by, min, max)), [min, max]);
  const reset = useCallback(() => setCount(clamp(initial, min, max)), [initial, min, max]);

  return { count, increment, decrement, set, reset };
};
