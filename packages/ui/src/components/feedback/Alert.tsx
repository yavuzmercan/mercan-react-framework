import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: 'info' | 'success' | 'warning' | 'danger';
  title?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ status = 'info', title, icon, className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-alert', className)} data-scheme={status} role="alert" {...rest}>
      <span className="mf-alert-indicator" aria-hidden="true" />
      {icon && <span aria-hidden="true">{icon}</span>}
      <div className="mf-alert-content">
        {title && <div className="mf-alert-title">{title}</div>}
        {children && <div>{children}</div>}
      </div>
    </div>
  ),
);
Alert.displayName = 'Alert';
