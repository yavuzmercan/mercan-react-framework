import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';
import type { Size } from '../types';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options?: SelectOption[];
  invalid?: boolean;
  size?: Size;
  placeholder?: string;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, invalid, size = 'md', placeholder, className, children, ...rest }, ref) => (
    <select
      ref={ref}
      className={cx('mf-select', className)}
      data-invalid={invalid ? 'true' : undefined}
      data-size={size}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options?.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
      {children}
    </select>
  ),
);
Select.displayName = 'Select';
