import { forwardRef, useCallback, type InputHTMLAttributes } from 'react';
import { cx } from '../../core';
import type { Size } from '../types';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'type'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: Size;
  invalid?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, defaultValue, onChange, min, max, step = 1, size = 'md', invalid, disabled, className, ...rest }, ref) => {
    const clamp = useCallback((n: number) => {
      let v = n;
      if (min !== undefined) v = Math.max(min, v);
      if (max !== undefined) v = Math.min(max, v);
      return v;
    }, [min, max]);

    const adjust = (delta: number) => {
      if (disabled) return;
      const current = value ?? defaultValue ?? 0;
      onChange?.(clamp(current + delta));
    };

    const atMax = value !== undefined && max !== undefined && value >= max;
    const atMin = value !== undefined && min !== undefined && value <= min;

    return (
      <div className={cx('mf-num-input', className)}>
        <input
          ref={ref}
          type="number"
          className="mf-input"
          data-size={size}
          data-invalid={invalid ? 'true' : undefined}
          value={value ?? ''}
          onChange={(e) => onChange?.(clamp(Number(e.target.value)))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          {...rest}
        />
        <div className="mf-num-stepper">
          <button type="button" className="mf-num-step-btn" onClick={() => adjust(step)} disabled={disabled || atMax} aria-label="Increment">▲</button>
          <button type="button" className="mf-num-step-btn" onClick={() => adjust(-step)} disabled={disabled || atMin} aria-label="Decrement">▼</button>
        </div>
      </div>
    );
  },
);
NumberInput.displayName = 'NumberInput';
