import { type ReactNode } from 'react';
import { cx } from '../../core';
import { Spinner } from '../display/Spinner';

export interface LoadingOverlayProps {
  visible: boolean;
  fullscreen?: boolean;
  message?: ReactNode;
  spinnerSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingOverlay = ({
  visible,
  fullscreen,
  message,
  spinnerSize = 'lg',
  className,
}: LoadingOverlayProps) => {
  if (!visible) return null;
  return (
    <div
      className={cx('mf-loading-overlay', className)}
      data-fullscreen={fullscreen ? 'true' : undefined}
      role="status"
      aria-live="polite"
    >
      <Spinner size={spinnerSize} />
      {message && <div style={{ color: 'var(--mf-color-textMuted)', fontSize: 'var(--mf-fs-sm)' }}>{message}</div>}
    </div>
  );
};
