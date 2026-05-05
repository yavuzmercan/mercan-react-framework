import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
  children?: ReactNode;
}

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ inline, className, style, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cx('mf-center', className)}
      style={{ display: inline ? 'inline-flex' : 'flex', ...style }}
      {...rest}
    >
      {children}
    </div>
  ),
);
Center.displayName = 'Center';
