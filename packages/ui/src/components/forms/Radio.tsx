import { createContext, forwardRef, useContext, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

interface RadioGroupCtx {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
}
const RadioGroupContext = createContext<RadioGroupCtx | null>(null);

export interface RadioGroupProps {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export const RadioGroup = ({ name, value, onChange, children, className }: RadioGroupProps) => (
  <RadioGroupContext.Provider value={{ name, value, onChange }}>
    <div className={cx('mf-radio-group', className)} role="radiogroup">{children}</div>
  </RadioGroupContext.Provider>
);

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  value: string;
  label?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, label, disabled, className, onChange, ...rest }, ref) => {
    const ctx = useContext(RadioGroupContext);
    const checked = ctx ? ctx.value === value : undefined;
    return (
      <label className={cx('mf-radio-wrap', className)} data-disabled={disabled ? 'true' : undefined}>
        <input
          ref={ref}
          type="radio"
          className="mf-radio-input"
          name={ctx?.name}
          value={value}
          checked={checked}
          onChange={(e) => {
            ctx?.onChange(value);
            onChange?.(e);
          }}
          disabled={disabled}
          {...rest}
        />
        <span className="mf-radio-box" aria-hidden="true" />
        {label && <span>{label}</span>}
      </label>
    );
  },
);
Radio.displayName = 'Radio';
