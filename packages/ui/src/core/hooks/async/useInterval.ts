import { useEffect, useRef } from 'react';

/** Declarative setInterval. Pass null to pause. */
export const useInterval = (callback: () => void, interval: number | null) => {
  const cb = useRef(callback);
  cb.current = callback;

  useEffect(() => {
    if (interval === null) return;
    const id = window.setInterval(() => cb.current(), interval);
    return () => window.clearInterval(id);
  }, [interval]);
};
