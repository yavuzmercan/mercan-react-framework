import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, disabled, className, ...rest }, ref) => (
    <label className={cx('mf-switch-wrap', className)} data-disabled={disabled ? 'true' : undefined}>
      <input ref={ref} type="checkbox" role="switch" className="mf-switch-input" disabled={disabled} {...rest} />
      <span className="mf-switch-track">
        <span className="mf-switch-thumb" />
      </span>
      {label && <span>{label}</span>}
    </label>
  ),
);
Switch.displayName = 'Switch';
