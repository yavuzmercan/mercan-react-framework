import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';
import type { ButtonVariant } from './Button';
import type { ColorScheme, Size } from '../types';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  'aria-label': string;
  variant?: ButtonVariant;
  colorScheme?: ColorScheme;
  size?: Size;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'ghost', colorScheme = 'secondary', size = 'md', className, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx('mf-btn', 'mf-icon-btn', 'mf-focus-ring', className)}
      data-variant={variant}
      data-scheme={colorScheme}
      data-size={size}
      {...rest}
    >
      {icon}
    </button>
  ),
);
IconButton.displayName = 'IconButton';
