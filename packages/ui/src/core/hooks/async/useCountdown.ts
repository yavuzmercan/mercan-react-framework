import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCountdownReturn {
  seconds: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (seconds?: number) => void;
}

/** Seconds-based countdown timer. Hits 0 then stops; fires `onComplete`. */
export const useCountdown = (
  initialSeconds: number,
  options: { autoStart?: boolean; onComplete?: () => void } = {},
): UseCountdownReturn => {
  const { autoStart = false, onComplete } = options;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isRunning) return;
    if (seconds <= 0) {
      setIsRunning(false);
      onCompleteRef.current?.();
      return;
    }
    const id = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [isRunning, seconds]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(
    (s?: number) => {
      setSeconds(s ?? initialSeconds);
      setIsRunning(autoStart);
    },
    [initialSeconds, autoStart],
  );

  return { seconds, isRunning, start, pause, reset };
};
