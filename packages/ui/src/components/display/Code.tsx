import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  block?: boolean;
  children: ReactNode;
}

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ block, className, children, ...rest }, ref) => {
    if (block) {
      return (
        <pre className={cx('mf-code-block', className)} {...(rest as any)}>
          <code ref={ref}>{children}</code>
        </pre>
      );
    }
    return (
      <code ref={ref} className={cx('mf-code', className)} {...rest}>
        {children}
      </code>
    );
  },
);
Code.displayName = 'Code';
