import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface IconBoxProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number | string;
  children: ReactNode;
}

export const Icon = forwardRef<HTMLSpanElement, IconBoxProps>(
  ({ size = 16, className, style, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cx('mf-icon', className)}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </span>
  ),
);
Icon.displayName = 'Icon';
