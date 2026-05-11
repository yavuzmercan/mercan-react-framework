import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../core';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, indeterminate, className, 'aria-label': ariaLabel, ...rest }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    const labelledBy = (rest as { 'aria-labelledby'?: string })['aria-labelledby'];
    return (
      <div
        ref={ref}
        className={cx('mf-progress', className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={ariaLabel ?? (labelledBy ? undefined : 'Progress')}
        data-indeterminate={indeterminate ? 'true' : undefined}
        {...rest}
      >
        <div className="mf-progress-bar" style={{ width: `${pct}%` }} />
      </div>
    );
  },
);
Progress.displayName = 'Progress';
