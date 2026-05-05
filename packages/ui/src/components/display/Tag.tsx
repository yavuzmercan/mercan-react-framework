import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  onClose?: () => void;
  children?: ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ onClose, className, children, ...rest }, ref) => (
    <span ref={ref} className={cx('mf-tag', className)} {...rest}>
      {children}
      {onClose && (
        <button type="button" className="mf-tag-close" aria-label="Remove" onClick={onClose}>
          ×
        </button>
      )}
    </span>
  ),
);
Tag.displayName = 'Tag';
