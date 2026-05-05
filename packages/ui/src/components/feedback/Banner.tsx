import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';
import type { ColorScheme } from '../types';

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  status?: ColorScheme;
  icon?: ReactNode;
  onClose?: () => void;
  action?: ReactNode;
  children?: ReactNode;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ status = 'primary', icon, onClose, action, className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-banner', className)} data-scheme={status} role="status" {...rest}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <div style={{ flex: 1 }}>{children}</div>
      {action}
      {onClose && (
        <button
          type="button"
          className="mf-banner-close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  ),
);
Banner.displayName = 'Banner';
