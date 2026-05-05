import { useEffect, useState } from 'react';

const DEFAULT_EVENTS = ['mousemove', 'keydown', 'wheel', 'touchstart', 'touchmove', 'scroll'] as const;

/** True when the user has been inactive for `timeout` ms. */
export const useIdle = (timeout = 60_000, events: string[] = DEFAULT_EVENTS as unknown as string[]): boolean => {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let timer: number | null = null;
    const reset = () => {
      setIdle(false);
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), timeout);
    };
    reset();
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [timeout, events]);

  return idle;
};
