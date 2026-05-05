import { useRef, useState } from 'react';
import { cx, useClickOutside, useTranslation } from '../../core';
import { CalendarIcon } from '../../icons';
import { Calendar } from './Calendar';

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: Intl.DateTimeFormatOptions;
  className?: string;
}

export const DatePicker = ({
  value: controlled,
  defaultValue,
  onChange,
  placeholder = 'Select date',
  disabled,
  invalid,
  minDate,
  maxDate,
  format = { dateStyle: 'medium' },
  className,
}: DatePickerProps) => {
  const { formatDate } = useTranslation();
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const value = controlled !== undefined ? controlled : internal;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false), open);

  const handleChange = (d: Date) => {
    if (controlled === undefined) setInternal(d);
    onChange?.(d);
    setOpen(false);
  };

  const display = value ? formatDate(value, format) : '';

  return (
    <div ref={ref} className={cx('mf-combo', className)}>
      <input
        type="text"
        className="mf-input"
        value={display}
        onClick={() => !disabled && setOpen((v) => !v)}
        onFocus={() => !disabled && setOpen(true)}
        readOnly
        disabled={disabled}
        placeholder={placeholder}
        data-invalid={invalid ? 'true' : undefined}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', paddingRight: 36 }}
      />
      <CalendarIcon
        size={16}
        color="var(--mf-color-textMuted)"
        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      />
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 'var(--mf-z-dropdown)' as any }}>
          <Calendar
            value={value}
            onChange={handleChange}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
};
