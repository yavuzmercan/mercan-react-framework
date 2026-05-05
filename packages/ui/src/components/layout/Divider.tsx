import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../core';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className, ...rest }, ref) => (
    <hr ref={ref} className={cx('mf-divider', className)} data-orientation={orientation} {...rest} />
  ),
);
Divider.displayName = 'Divider';
