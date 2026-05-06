import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, useResponsiveValue, v, type ResponsiveValue } from '../../core';
import type { SpacingKey } from '../types';

export interface SimpleGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of equal columns. Ignored if `minChildWidth` is set. */
  columns?: ResponsiveValue<number>;
  /** Auto-fit columns: each child gets at least this width. */
  minChildWidth?: ResponsiveValue<number | string>;
  gap?: ResponsiveValue<SpacingKey>;
  children?: ReactNode;
}

export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  ({ columns, minChildWidth, gap = 'md', className, style, children, ...rest }, ref) => {
    const cols = useResponsiveValue(columns);
    const minW = useResponsiveValue(minChildWidth);
    const gp = useResponsiveValue(gap) ?? 'md';

    const template = minW
      ? `repeat(auto-fit, minmax(${typeof minW === 'number' ? `${minW}px` : minW}, 1fr))`
      : cols
      ? `repeat(${cols}, minmax(0, 1fr))`
      : 'repeat(auto-fit, minmax(240px, 1fr))';

    return (
      <div
        ref={ref}
        className={cx('mf-simple-grid', className)}
        style={{ gridTemplateColumns: template, gap: v.space(gp as SpacingKey), ...style }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SimpleGrid.displayName = 'SimpleGrid';
