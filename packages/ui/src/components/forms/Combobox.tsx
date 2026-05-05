import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cx, useClickOutside } from '../../core';
import { Check } from '../../icons';

export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  emptyMessage?: string;
  className?: string;
  filterFn?: (query: string, option: ComboboxOption) => boolean;
}

const defaultFilter = (q: string, opt: ComboboxOption) =>
  opt.label.toLowerCase().includes(q.toLowerCase());

export const Combobox = ({
  options,
  value: controlled,
  defaultValue = '',
  onChange,
  placeholder = 'Select…',
  disabled,
  invalid,
  emptyMessage = 'No results',
  className,
  filterFn = defaultFilter,
}: ComboboxProps) => {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const display = open ? query : selected?.label ?? '';
  const filtered = options.filter((o) => filterFn(query, o));

  useClickOutside(ref, () => setOpen(false), open);

  useEffect(() => {
    if (!open) setQuery('');
    if (open) setActive(0);
  }, [open]);

  const select = (opt: ComboboxOption) => {
    if (opt.disabled) return;
    if (controlled === undefined) setInternal(opt.value);
    onChange?.(opt.value);
    setOpen(false);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filtered[active];
      if (opt) select(opt);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className={cx('mf-combo', className)}>
      <input
        type="text"
        className="mf-input"
        data-invalid={invalid ? 'true' : undefined}
        value={display}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!open) setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        disabled={disabled}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
      />
      {open && (
        <div className="mf-combo-popover" role="listbox">
          {filtered.length === 0 ? (
            <div className="mf-combo-empty">{emptyMessage}</div>
          ) : (
            filtered.map((opt, i) => (
              <div
                key={opt.value}
                className="mf-combo-option"
                role="option"
                aria-selected={opt.value === value}
                data-selected={opt.value === value ? 'true' : undefined}
                data-highlighted={i === active ? 'true' : undefined}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(opt);
                }}
              >
                <span style={{ flex: 1 }}>{opt.label}</span>
                {opt.value === value && <Check size={14} />}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
