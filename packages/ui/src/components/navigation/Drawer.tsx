import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx, useEscape, useFocusTrap } from '../../core';
import { IconButton } from '../forms/IconButton';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Drawer = ({ isOpen, onClose, side = 'right', title, children, className }: DrawerProps) => {
  const drawerRef = useRef<HTMLElement>(null);
  useEscape(onClose, isOpen);
  useFocusTrap(drawerRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <div className="mf-drawer-overlay" onClick={onClose} />
      <aside
        ref={drawerRef}
        className={cx('mf-drawer', className)}
        data-side={side}
        role="dialog"
        aria-modal="true"
      >
        <div className="mf-drawer-header">
          <h3 style={{ margin: 0, fontSize: 'var(--mf-fs-lg)', fontWeight: 'var(--mf-fw-semibold)' }}>{title}</h3>
          <IconButton aria-label="Close" icon={<span style={{ fontSize: 20, lineHeight: 1 }}>×</span>} onClick={onClose} />
        </div>
        <div className="mf-drawer-body">{children}</div>
      </aside>
    </>,
    document.body,
  );
};
