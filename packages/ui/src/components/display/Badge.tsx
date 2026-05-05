import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';
import type { ColorScheme } from '../types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  colorScheme?: ColorScheme | 'neutral';
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ colorScheme = 'primary', className, children, ...rest }, ref) => (
    <span ref={ref} className={cx('mf-badge', className)} data-scheme={colorScheme} {...rest}>
      {children}
    </span>
  ),
);
Badge.displayName = 'Badge';
