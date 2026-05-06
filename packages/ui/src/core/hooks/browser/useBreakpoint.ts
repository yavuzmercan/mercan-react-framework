import { useEffect, useState } from 'react';
import { baseTokens } from '../../theme/tokens';
import type { Tokens } from '../../theme/tokens';

export type BreakpointName = keyof Tokens['breakpoints'];

const ORDER: BreakpointName[] = ['sm', 'md', 'lg', 'xl', '2xl'];

const parsePx = (raw: string): number => parseInt(raw, 10);

const resolveBreakpoints = (custom?: Partial<Tokens['breakpoints']>): Record<BreakpointName, number> => {
  const merged = { ...baseTokens.breakpoints, ...custom };
  return {
    sm: parsePx(merged.sm),
    md: parsePx(merged.md),
    lg: parsePx(merged.lg),
    xl: parsePx(merged.xl),
    '2xl': parsePx(merged['2xl']),
  };
};

const getCurrentWidth = (): number => {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth;
};

const getActiveBreakpoint = (width: number, bp: Record<BreakpointName, number>): BreakpointName | 'base' => {
  if (width >= bp['2xl']) return '2xl';
  if (width >= bp.xl) return 'xl';
  if (width >= bp.lg) return 'lg';
  if (width >= bp.md) return 'md';
  if (width >= bp.sm) return 'sm';
  return 'base';
};

const useViewportWidth = (): number => {
  const [width, setWidth] = useState<number>(getCurrentWidth);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
};

/**
 * Returns the currently active breakpoint name.
 * 'base' < 640 (sm) < 768 (md) < 1024 (lg) < 1280 (xl) < 1536 (2xl)
 *
 * @example
 * const bp = useBreakpoint();
 * if (bp === 'base' || bp === 'sm') return <MobileLayout />;
 * return <DesktopLayout />;
 */
export const useBreakpoint = (custom?: Partial<Tokens['breakpoints']>): BreakpointName | 'base' => {
  const width = useViewportWidth();
  const bp = resolveBreakpoints(custom);
  return getActiveBreakpoint(width, bp);
};

/** True when viewport width is at or above the named breakpoint. `useBreakpointUp('md')` ↔ `min-width: 768px`. */
export const useBreakpointUp = (
  name: BreakpointName,
  custom?: Partial<Tokens['breakpoints']>,
): boolean => {
  const width = useViewportWidth();
  const bp = resolveBreakpoints(custom);
  return width >= bp[name];
};

/** True when viewport width is below the named breakpoint. `useBreakpointDown('md')` ↔ `max-width: 767.98px`. */
export const useBreakpointDown = (
  name: BreakpointName,
  custom?: Partial<Tokens['breakpoints']>,
): boolean => {
  const width = useViewportWidth();
  const bp = resolveBreakpoints(custom);
  return width < bp[name];
};

/** Pick a value based on the current breakpoint. Falls back to lower breakpoints. */
export function useBreakpointValue<T>(
  values: Partial<Record<BreakpointName | 'base', T>>,
  custom?: Partial<Tokens['breakpoints']>,
): T | undefined {
  const current = useBreakpoint(custom);
  // Walk from current down to base, return first defined value
  const idx = ORDER.indexOf(current as BreakpointName);
  const chain: Array<BreakpointName | 'base'> =
    current === 'base' ? ['base'] : [...ORDER.slice(0, idx + 1).reverse(), 'base'];
  for (const key of chain) {
    if (values[key] !== undefined) return values[key];
  }
  return undefined;
}
