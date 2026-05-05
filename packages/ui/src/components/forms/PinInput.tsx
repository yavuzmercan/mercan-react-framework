import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cx } from '../../core';

export interface PinInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  type?: 'numeric' | 'alphanumeric';
  mask?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export const PinInput = ({
  length = 6,
  value: controlled,
  defaultValue = '',
  onChange,
  onComplete,
  type = 'numeric',
  mask,
  disabled,
  autoFocus,
  className,
}: PinInputProps) => {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const setValue = (next: string) => {
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
    if (next.length === length) onComplete?.(next);
  };

  const allowed = (ch: string) => {
    if (type === 'numeric') return /\d/.test(ch);
    return /[a-zA-Z0-9]/.test(ch);
  };

  const handleInput = (idx: number, raw: string) => {
    const ch = raw.slice(-1);
    if (raw && !allowed(ch)) return;
    const arr = value.split('');
    arr[idx] = ch;
    while (arr.length < length) arr.push('');
    const next = arr.slice(0, length).join('');
    setValue(next);
    if (ch && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKey = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) refs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').slice(0, length);
    const filtered = [...text].filter(allowed).join('');
    setValue(filtered);
    refs.current[Math.min(filtered.length, length - 1)]?.focus();
  };

  return (
    <div className={cx('mf-pin-input', className)}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="mf-pin-cell"
          type={mask ? 'password' : type === 'numeric' ? 'tel' : 'text'}
          inputMode={type === 'numeric' ? 'numeric' : 'text'}
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          disabled={disabled}
          autoComplete="off"
        />
      ))}
    </div>
  );
};
