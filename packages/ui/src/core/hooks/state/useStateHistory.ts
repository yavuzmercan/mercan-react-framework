import { useCallback, useRef, useState } from 'react';

export interface UseStateHistoryReturn<T> {
  value: T;
  set: (value: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  history: T[];
  reset: () => void;
}

/** State with undo/redo history. */
export const useStateHistory = <T>(initial: T, capacity = 50): UseStateHistoryReturn<T> => {
  const [history, setHistory] = useState<T[]>([initial]);
  const [index, setIndex] = useState(0);
  const initialRef = useRef(initial);

  const set = useCallback((value: T) => {
    setHistory((prev) => {
      const trimmed = prev.slice(0, index + 1);
      trimmed.push(value);
      return trimmed.length > capacity ? trimmed.slice(trimmed.length - capacity) : trimmed;
    });
    setIndex((i) => Math.min(i + 1, capacity - 1));
  }, [index, capacity]);

  const undo = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const redo = useCallback(() => setIndex((i) => Math.min(history.length - 1, i + 1)), [history.length]);

  const reset = useCallback(() => {
    setHistory([initialRef.current]);
    setIndex(0);
  }, []);

  return {
    value: history[index]!,
    set,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
    history,
    reset,
  };
};
