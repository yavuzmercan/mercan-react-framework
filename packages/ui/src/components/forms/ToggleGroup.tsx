import { createContext, useContext, useState, type ReactNode } from 'react';
import { cx } from '../../core';

interface ToggleCtx {
  value: string | string[];
  setValue: (v: string) => void;
  multiple: boolean;
}
const ToggleContext = createContext<ToggleCtx | null>(null);
const useToggleCtx = () => {
  const ctx = useContext(ToggleContext);
  if (!ctx) throw new Error('ToggleButton must be used inside <ToggleGroup>');
  return ctx;
};

export interface ToggleGroupProps {
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  children: ReactNode;
  className?: string;
}

export const ToggleGroup = ({
  value: controlled,
  defaultValue,
  onChange,
  multiple = false,
  children,
  className,
}: ToggleGroupProps) => {
  const [internal, setInternal] = useState<string | string[]>(defaultValue ?? (multiple ? [] : ''));
  const value = controlled ?? internal;

  const setValue = (v: string) => {
    let next: string | string[];
    if (multiple) {
      const arr = Array.isArray(value) ? value : [];
      next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
    } else {
      next = v;
    }
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <ToggleContext.Provider value={{ value, setValue, multiple }}>
      <div className={cx('mf-toggle-group', className)} role="group">{children}</div>
    </ToggleContext.Provider>
  );
};

export interface ToggleButtonProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const ToggleButton = ({ value, children, disabled, className }: ToggleButtonProps) => {
  const ctx = useToggleCtx();
  const active = ctx.multiple
    ? Array.isArray(ctx.value) && ctx.value.includes(value)
    : ctx.value === value;
  return (
    <button
      type="button"
      className={cx('mf-toggle-btn', className)}
      data-active={active ? 'true' : undefined}
      aria-pressed={active}
      disabled={disabled}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  );
};
