import { useBreakpoint, type BreakpointName } from './useBreakpoint';
import type { Tokens } from '../../theme/tokens';

/**
 * A value that can be either a single literal or a per-breakpoint object.
 *
 * @example
 * type Cols = ResponsiveValue<number>;
 * // 1                                  → fixed for all viewports
 * // { base: 1, md: 2, lg: 4 }          → responsive
 */
export type ResponsiveValue<T> = T | Partial<Record<BreakpointName | 'base', T>>;

const BP_ORDER: Array<BreakpointName | 'base'> = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

const isResponsiveObject = <T>(value: unknown): value is Partial<Record<BreakpointName | 'base', T>> => {
  if (value === null || typeof value !== 'object') return false;
  // Heuristic: contains at least one breakpoint key
  return BP_ORDER.some((k) => k in (value as Record<string, unknown>));
};

/**
 * Resolve a `ResponsiveValue<T>` to a single value based on the current viewport.
 * If a literal value is passed, returns it unchanged.
 * If an object is passed, picks the value for the active breakpoint, falling back
 * to lower breakpoints (so `{ base: 1, lg: 4 }` returns `1` until viewport ≥ 1024px).
 *
 * @example
 * const cols = useResponsiveValue({ base: 1, md: 2, lg: 4 });
 * return <Grid columns={cols}>{...}</Grid>;
 */
export function useResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  custom?: Partial<Tokens['breakpoints']>,
): T | undefined {
  const current = useBreakpoint(custom);

  if (value === undefined) return undefined;
  if (!isResponsiveObject<T>(value)) return value as T;

  const obj = value as Partial<Record<BreakpointName | 'base', T>>;
  // Walk down from current breakpoint to base; first defined value wins
  const idx = BP_ORDER.indexOf(current);
  for (let i = idx; i >= 0; i--) {
    const key = BP_ORDER[i]!;
    if (obj[key] !== undefined) return obj[key];
  }
  return undefined;
}
