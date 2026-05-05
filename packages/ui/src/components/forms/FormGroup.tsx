import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-field-group', className)} {...rest}>
      {children}
    </div>
  ),
);
FormGroup.displayName = 'FormGroup';
