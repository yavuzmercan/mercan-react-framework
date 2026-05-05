import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { cx } from '../../core';
import { Eye, EyeOff } from '../../icons';
import type { Size } from '../types';

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: Size;
  invalid?: boolean;
  hideToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ size = 'md', invalid, hideToggle, className, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <div className={cx('mf-password', className)}>
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className="mf-input"
          data-size={size}
          data-invalid={invalid ? 'true' : undefined}
          {...rest}
        />
        {!hideToggle && (
          <button
            type="button"
            className="mf-password-toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';
