import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, className, children, ...rest }, ref) => {
    const Tag = `h${level}` as 'h1';
    return (
      <Tag ref={ref} className={cx('mf-heading', className)} data-level={String(level)} {...rest}>
        {children}
      </Tag>
    );
  },
);
Heading.displayName = 'Heading';
