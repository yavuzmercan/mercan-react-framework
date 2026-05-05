import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../core';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width = '100%', height = 16, circle, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={cx('mf-skeleton', className)}
      style={{
        width,
        height: circle ? width : height,
        borderRadius: circle ? '50%' : undefined,
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    />
  ),
);
Skeleton.displayName = 'Skeleton';
