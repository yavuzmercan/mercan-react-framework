import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  helpText?: ReactNode;
  /** Direction of the change indicator. */
  direction?: 'up' | 'down';
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(
  ({ label, value, helpText, direction, className, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-stat', className)} {...rest}>
      <div className="mf-stat-label">{label}</div>
      <div className="mf-stat-value">{value}</div>
      {helpText && (
        <div className="mf-stat-help">
          {direction && (
            <span className="mf-stat-arrow" data-dir={direction} aria-hidden="true">
              {direction === 'up' ? '▲' : '▼'}
            </span>
          )}
          <span>{helpText}</span>
        </div>
      )}
    </div>
  ),
);
Stat.displayName = 'Stat';
