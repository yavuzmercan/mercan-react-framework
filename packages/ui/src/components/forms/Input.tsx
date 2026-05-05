import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx } from '../../core';
import type { Size } from '../types';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', invalid, className, ...rest }, ref) => (
    <input
      ref={ref}
      className={cx('mf-input', className)}
      data-size={size}
      data-invalid={invalid ? 'true' : undefined}
      {...rest}
    />
  ),
);
Input.displayName = 'Input';
