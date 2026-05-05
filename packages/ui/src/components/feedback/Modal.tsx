import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx, useEscape, useFocusTrap } from '../../core';
import { IconButton } from '../forms/IconButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  closeOnEsc = true,
  hideCloseButton,
  className,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEscape(onClose, isOpen && closeOnEsc);
  useFocusTrap(dialogRef, isOpen);

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
    <div
      className="mf-modal-overlay"
      onMouseDown={(e) => {
        if (closeOnOverlay && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={cx('mf-modal', className)}
        data-size={size}
        role="dialog"
        aria-modal="true"
      >
        {(title || !hideCloseButton) && (
          <div className="mf-modal-header">
            <h3 className="mf-modal-title">{title}</h3>
            {!hideCloseButton && (
              <IconButton aria-label="Close" icon={<span style={{ fontSize: 20, lineHeight: 1 }}>×</span>} onClick={onClose} />
            )}
          </div>
        )}
        <div className="mf-modal-body">{children}</div>
        {footer && <div className="mf-modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};
