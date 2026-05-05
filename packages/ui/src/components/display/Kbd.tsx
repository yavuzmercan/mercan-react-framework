import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, children, ...rest }, ref) => (
    <kbd ref={ref} className={cx('mf-kbd', className)} {...rest}>
      {children}
    </kbd>
  ),
);
Kbd.displayName = 'Kbd';
