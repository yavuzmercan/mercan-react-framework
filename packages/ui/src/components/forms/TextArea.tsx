import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../core';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ invalid, className, ...rest }, ref) => (
    <textarea
      ref={ref}
      className={cx('mf-textarea', className)}
      data-invalid={invalid ? 'true' : undefined}
      {...rest}
    />
  ),
);
TextArea.displayName = 'TextArea';
