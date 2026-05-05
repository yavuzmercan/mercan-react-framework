import { useState } from 'react';
import { cx } from '../../core';
import { Star } from '../../icons';

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  size?: number;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const Rating = ({
  value: controlled,
  defaultValue = 0,
  onChange,
  count = 5,
  size = 20,
  readOnly,
  disabled,
  className,
  'aria-label': ariaLabel = 'Rating',
}: RatingProps) => {
  const [internal, setInternal] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const value = controlled ?? internal;
  const display = hover ?? value;

  const setValue = (v: number) => {
    if (readOnly || disabled) return;
    if (controlled === undefined) setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      className={cx('mf-rating', className)}
      data-readonly={readOnly ? 'true' : undefined}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {Array.from({ length: count }, (_, i) => {
        const idx = i + 1;
        const active = idx <= display;
        return (
          <button
            key={idx}
            type="button"
            className="mf-rating-star"
            data-active={active ? 'true' : undefined}
            disabled={disabled}
            aria-label={`${idx} of ${count}`}
            aria-checked={idx === value}
            role="radio"
            onMouseEnter={() => !readOnly && setHover(idx)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setValue(idx)}
          >
            <Star size={size} fill={active ? 'currentColor' : 'none'} />
          </button>
        );
      })}
    </div>
  );
};
