import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../core';
import type { Size } from '../types';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: Size;
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading', className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cx('mf-spinner', className)}
      data-size={size}
      role="status"
      aria-label={label}
      {...rest}
    />
  ),
);
Spinner.displayName = 'Spinner';
