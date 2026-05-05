import { useEffect, useRef, useState } from 'react';

/** Throttled value — emits at most once every `interval` ms. */
export const useThrottle = <T>(value: T, interval = 200): T => {
  const [throttled, setThrottled] = useState(value);
  const lastUpdate = useRef(Date.now());

  useEffect(() => {
    const elapsed = Date.now() - lastUpdate.current;
    if (elapsed >= interval) {
      lastUpdate.current = Date.now();
      setThrottled(value);
      return;
    }
    const id = window.setTimeout(() => {
      lastUpdate.current = Date.now();
      setThrottled(value);
    }, interval - elapsed);
    return () => window.clearTimeout(id);
  }, [value, interval]);

  return throttled;
};
