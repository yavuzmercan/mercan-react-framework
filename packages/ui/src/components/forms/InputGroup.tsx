import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-input-group', className)} {...rest}>
      {children}
    </div>
  ),
);
InputGroup.displayName = 'InputGroup';

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(
  ({ className, children, ...rest }, ref) => (
    <span ref={ref} className={cx('mf-input-addon', className)} {...rest}>
      {children}
    </span>
  ),
);
InputAddon.displayName = 'InputAddon';
