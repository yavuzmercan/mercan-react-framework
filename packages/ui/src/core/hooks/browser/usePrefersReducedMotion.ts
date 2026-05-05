import { useMediaQuery } from './useMediaQuery';

/** True if the user has requested reduced motion in their OS settings. */
export const usePrefersReducedMotion = (): boolean =>
  useMediaQuery('(prefers-reduced-motion: reduce)');
