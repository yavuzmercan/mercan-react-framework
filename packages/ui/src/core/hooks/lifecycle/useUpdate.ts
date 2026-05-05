import { useCallback, useState } from 'react';

/** Returns a function that, when called, forces a re-render. */
export const useUpdate = (): (() => void) => {
  const [, setTick] = useState(0);
  return useCallback(() => setTick((n) => n + 1), []);
};
