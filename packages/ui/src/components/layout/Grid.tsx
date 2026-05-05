import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, v } from '../../core';
import type { SpacingKey } from '../types';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  rows?: number | string;
  gap?: SpacingKey;
  columnGap?: SpacingKey;
  rowGap?: SpacingKey;
  children?: ReactNode;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns, rows, gap, columnGap, rowGap, className, style, children, ...rest }, ref) => {
    const cols =
      typeof columns === 'number' ? `repeat(${columns}, minmax(0, 1fr))` : columns;
    const rs = typeof rows === 'number' ? `repeat(${rows}, minmax(0, 1fr))` : rows;
    return (
      <div
        ref={ref}
        className={cx('mf-grid', className)}
        style={{
          gridTemplateColumns: cols,
          gridTemplateRows: rs,
          ...(gap && { gap: v.space(gap) }),
          ...(columnGap && { columnGap: v.space(columnGap) }),
          ...(rowGap && { rowGap: v.space(rowGap) }),
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
