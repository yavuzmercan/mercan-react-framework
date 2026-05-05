import { useEffect, useState } from 'react';

/**
 * Returns the current `Date`, refreshing every `interval` ms.
 * Useful for "X minutes ago" timestamps that should update.
 */
export const useNow = (interval = 1000): Date => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), interval);
    return () => window.clearInterval(id);
  }, [interval]);
  return now;
};
