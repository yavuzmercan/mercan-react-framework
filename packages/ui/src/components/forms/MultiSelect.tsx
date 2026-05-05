import { useRef, useState, type KeyboardEvent } from 'react';
import { cx, useClickOutside } from '../../core';
import { Check } from '../../icons';
import { Tag } from '../display/Tag';

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const MultiSelect = ({
  options,
  value: controlled,
  defaultValue = [],
  onChange,
  placeholder = 'Select…',
  disabled,
  className,
}: MultiSelectProps) => {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const value = controlled ?? internal;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(ref, () => setOpen(false), open);

  const setValue = (next: string[]) => {
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };

  const toggle = (val: string) => {
    setValue(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);
  };

  const remove = (val: string) => setValue(value.filter((v) => v !== val));

  const filtered = options
    .filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  const selectedOptions = value.map((v) => options.find((o) => o.value === v)).filter(Boolean) as MultiSelectOption[];

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && query === '' && value.length > 0) {
      remove(value[value.length - 1]!);
    }
  };

  return (
    <div ref={ref} className={cx('mf-combo', className)}>
      <div
        className="mf-multiselect-control"
        data-focus={open ? 'true' : undefined}
        onClick={() => {
          if (!disabled) {
            setOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
        {selectedOptions.length === 0 && query === '' && (
          <span className="mf-multiselect-placeholder">{placeholder}</span>
        )}
        {selectedOptions.map((opt) => (
          <Tag key={opt.value} onClose={disabled ? undefined : () => remove(opt.value)}>
            {opt.label}
          </Tag>
        ))}
        <input
          ref={inputRef}
          className="mf-multiselect-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKey}
          disabled={disabled}
        />
      </div>
      {open && (
        <div className="mf-combo-popover" role="listbox">
          {filtered.length === 0 ? (
            <div className="mf-combo-empty">No options</div>
          ) : (
            filtered.map((opt) => {
              const selected = value.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  className="mf-combo-option"
                  role="option"
                  aria-selected={selected}
                  data-selected={selected ? 'true' : undefined}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggle(opt.value);
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                >
                  <span style={{ flex: 1 }}>{opt.label}</span>
                  {selected && <Check size={14} />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
