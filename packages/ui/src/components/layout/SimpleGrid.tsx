import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, v } from '../../core';
import type { SpacingKey } from '../types';

export interface SimpleGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of equal columns. Ignored if `minChildWidth` is set. */
  columns?: number;
  /** Auto-fit columns: each child gets at least this width. */
  minChildWidth?: number | string;
  gap?: SpacingKey;
  children?: ReactNode;
}

export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  ({ columns, minChildWidth, gap = 'md', className, style, children, ...rest }, ref) => {
    const template = minChildWidth
      ? `repeat(auto-fit, minmax(${typeof minChildWidth === 'number' ? `${minChildWidth}px` : minChildWidth}, 1fr))`
      : columns
      ? `repeat(${columns}, minmax(0, 1fr))`
      : 'repeat(auto-fit, minmax(240px, 1fr))';
    return (
      <div
        ref={ref}
        className={cx('mf-simple-grid', className)}
        style={{ gridTemplateColumns: template, gap: v.space(gap), ...style }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
SimpleGrid.displayName = 'SimpleGrid';
