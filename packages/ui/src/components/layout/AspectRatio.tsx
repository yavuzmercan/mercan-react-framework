import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  children?: ReactNode;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, style, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cx('mf-aspect', className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%`, ...style }}
      {...rest}
    >
      {children}
    </div>
  ),
);
AspectRatio.displayName = 'AspectRatio';
