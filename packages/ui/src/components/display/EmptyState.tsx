import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-empty', className)} {...rest}>
      {icon && <div className="mf-empty-icon">{icon}</div>}
      {title && <div className="mf-empty-title">{title}</div>}
      {description && <div>{description}</div>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  ),
);
EmptyState.displayName = 'EmptyState';
