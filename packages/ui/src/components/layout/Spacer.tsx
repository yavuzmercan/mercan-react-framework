import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../core';

export const Spacer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-spacer', className)} aria-hidden="true" {...rest} />
  ),
);
Spacer.displayName = 'Spacer';
