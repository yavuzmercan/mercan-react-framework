import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, useResponsiveValue, v, type ResponsiveValue } from '../../core';
import type { SpacingKey } from '../types';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of equal columns or any CSS grid-template-columns value. Accepts a responsive object. */
  columns?: ResponsiveValue<number | string>;
  rows?: ResponsiveValue<number | string>;
  gap?: ResponsiveValue<SpacingKey>;
  columnGap?: ResponsiveValue<SpacingKey>;
  rowGap?: ResponsiveValue<SpacingKey>;
  children?: ReactNode;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns, rows, gap, columnGap, rowGap, className, style, children, ...rest }, ref) => {
    const cols = useResponsiveValue(columns);
    const rws = useResponsiveValue(rows);
    const gp = useResponsiveValue(gap);
    const cgp = useResponsiveValue(columnGap);
    const rgp = useResponsiveValue(rowGap);

    const colsTemplate = typeof cols === 'number' ? `repeat(${cols}, minmax(0, 1fr))` : cols;
    const rowsTemplate = typeof rws === 'number' ? `repeat(${rws}, minmax(0, 1fr))` : rws;

    return (
      <div
        ref={ref}
        className={cx('mf-grid', className)}
        style={{
          gridTemplateColumns: colsTemplate,
          gridTemplateRows: rowsTemplate,
          ...(gp && { gap: v.space(gp) }),
          ...(cgp && { columnGap: v.space(cgp) }),
          ...(rgp && { rowGap: v.space(rgp) }),
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
Grid.displayName = 'Grid';

/**
 * Item inside a Grid that can span multiple columns/rows.
 * All span/start/end props accept responsive values.
 */
export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  colSpan?: ResponsiveValue<number | 'full'>;
  rowSpan?: ResponsiveValue<number | 'full'>;
  colStart?: ResponsiveValue<number>;
  colEnd?: ResponsiveValue<number>;
  rowStart?: ResponsiveValue<number>;
  rowEnd?: ResponsiveValue<number>;
  children?: ReactNode;
}

const spanValue = (v: number | 'full' | undefined): string | undefined => {
  if (v === undefined) return undefined;
  if (v === 'full') return '1 / -1';
  return `span ${v} / span ${v}`;
};

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ colSpan, rowSpan, colStart, colEnd, rowStart, rowEnd, className, style, children, ...rest }, ref) => {
    const cs = useResponsiveValue(colSpan);
    const rs = useResponsiveValue(rowSpan);
    const cStart = useResponsiveValue(colStart);
    const cEnd = useResponsiveValue(colEnd);
    const rStart = useResponsiveValue(rowStart);
    const rEnd = useResponsiveValue(rowEnd);

    return (
      <div
        ref={ref}
        className={cx('mf-grid-item', className)}
        style={{
          ...(cs !== undefined && { gridColumn: spanValue(cs) }),
          ...(rs !== undefined && { gridRow: spanValue(rs) }),
          ...(cStart !== undefined && { gridColumnStart: cStart }),
          ...(cEnd !== undefined && { gridColumnEnd: cEnd }),
          ...(rStart !== undefined && { gridRowStart: rStart }),
          ...(rEnd !== undefined && { gridRowEnd: rEnd }),
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
GridItem.displayName = 'GridItem';
