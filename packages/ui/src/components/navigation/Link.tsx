import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  tone?: 'default' | 'muted';
  children: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ external, tone = 'default', className, children, target, rel, ...rest }, ref) => (
    <a
      ref={ref}
      className={cx('mf-link', className)}
      data-tone={tone === 'muted' ? 'muted' : undefined}
      target={external ? '_blank' : target}
      rel={external ? 'noopener noreferrer' : rel}
      {...rest}
    >
      {children}
      {external && <span aria-hidden="true" style={{ fontSize: '0.85em' }}>↗</span>}
    </a>
  ),
);
Link.displayName = 'Link';
