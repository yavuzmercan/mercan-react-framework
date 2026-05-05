import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, disabled, className, ...rest }, ref) => (
    <label className={cx('mf-checkbox-wrap', className)} data-disabled={disabled ? 'true' : undefined}>
      <input ref={ref} type="checkbox" className="mf-checkbox-input" disabled={disabled} {...rest} />
      <span className="mf-checkbox-box" aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  ),
);
Checkbox.displayName = 'Checkbox';
