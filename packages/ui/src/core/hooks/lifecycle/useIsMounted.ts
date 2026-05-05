import { useCallback, useEffect, useRef } from 'react';

/** Returns a function that tells you whether the component is still mounted. */
export const useIsMounted = (): (() => boolean) => {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback(() => mounted.current, []);
};
