import { useEffect } from 'react';

/** Runs the callback exactly once on mount. */
export const useMount = (fn: () => void | (() => void)) => {
  useEffect(() => {
    return fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
