import { forwardRef, type LabelHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children?: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...rest }, ref) => (
    <label ref={ref} className={cx('mf-label', className)} {...rest}>
      {children}
      {required && <span className="mf-label-required" aria-hidden="true">*</span>}
    </label>
  ),
);
Label.displayName = 'Label';
