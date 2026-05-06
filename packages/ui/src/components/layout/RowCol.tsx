import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, useBreakpoint, v, type BreakpointName } from '../../core';
import type { SpacingKey } from '../types';

/**
 * 12-column responsive grid system, Bootstrap-style.
 *
 * @example
 * <Row gutter="md">
 *   <Col span={12} md={6} lg={4}>A</Col>
 *   <Col span={12} md={6} lg={4}>B</Col>
 *   <Col span={12} md={12} lg={4}>C</Col>
 * </Row>
 */
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between columns (and between wrapped rows). */
  gutter?: SpacingKey;
  /** Horizontal alignment of columns. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Vertical alignment of columns. */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Reverse column order. */
  reverse?: boolean;
  children?: ReactNode;
}

export const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ gutter = 'md', justify, align, reverse, className, style, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cx('mf-row', className)}
      data-justify={justify}
      data-align={align}
      data-reverse={reverse ? 'true' : undefined}
      style={{ gap: v.space(gutter), ...style }}
      {...rest}
    >
      {children}
    </div>
  ),
);
Row.displayName = 'Row';

/* ===== Col ===== */

const BP_ORDER: BreakpointName[] = ['sm', 'md', 'lg', 'xl', '2xl'];

export type ColSpan = number | 'auto' | 'fill';

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /** Span at the smallest breakpoint (always applies unless overridden). 1–12, 'auto', or 'fill'. */
  span?: ColSpan;
  /** Column offset (left margin), 0–11. */
  offset?: number;
  /** Display order within the row. */
  order?: number;

  /** ≥640px override. */
  sm?: ColSpan;
  /** ≥768px override. */
  md?: ColSpan;
  /** ≥1024px override. */
  lg?: ColSpan;
  /** ≥1280px override. */
  xl?: ColSpan;
  /** ≥1536px override. */
  '2xl'?: ColSpan;

  children?: ReactNode;
}

const computeFlexBasis = (span: ColSpan | undefined): string | undefined => {
  if (span === undefined) return undefined;
  if (span === 'auto') return 'auto';
  if (span === 'fill') return '0';
  // 12-column grid: span/12 of available width
  const pct = (span / 12) * 100;
  return `${pct}%`;
};

const computeFlexGrow = (span: ColSpan | undefined): number | undefined => {
  if (span === undefined) return undefined;
  if (span === 'fill') return 1;
  return 0;
};

const computeMaxWidth = (span: ColSpan | undefined): string | undefined => {
  if (span === undefined || span === 'auto' || span === 'fill') return undefined;
  return `${(span / 12) * 100}%`;
};

const pickSpan = (
  current: BreakpointName | 'base',
  base: ColSpan | undefined,
  overrides: Partial<Record<BreakpointName, ColSpan>>,
): ColSpan | undefined => {
  if (current === 'base') return base;
  // Walk down from current breakpoint; first defined override wins
  const idx = BP_ORDER.indexOf(current);
  for (let i = idx; i >= 0; i--) {
    const key = BP_ORDER[i]!;
    if (overrides[key] !== undefined) return overrides[key];
  }
  return base;
};

export const Col = forwardRef<HTMLDivElement, ColProps>(
  ({ span, sm, md, lg, xl, '2xl': twoXl, offset, order, className, style, children, ...rest }, ref) => {
    const current = useBreakpoint();
    const overrides: Partial<Record<BreakpointName, ColSpan>> = {
      ...(sm !== undefined && { sm }),
      ...(md !== undefined && { md }),
      ...(lg !== undefined && { lg }),
      ...(xl !== undefined && { xl }),
      ...(twoXl !== undefined && { '2xl': twoXl }),
    };
    const activeSpan = pickSpan(current, span, overrides);

    return (
      <div
        ref={ref}
        className={cx('mf-col', className)}
        style={{
          flexBasis: computeFlexBasis(activeSpan),
          flexGrow: computeFlexGrow(activeSpan),
          maxWidth: computeMaxWidth(activeSpan),
          ...(offset !== undefined && { marginLeft: `${(offset / 12) * 100}%` }),
          ...(order !== undefined && { order }),
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
Col.displayName = 'Col';
