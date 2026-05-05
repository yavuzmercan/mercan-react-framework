import { type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  copyright?: ReactNode;
  links?: ReactNode;
  children?: ReactNode;
}

export const Footer = ({ copyright, links, className, children, ...rest }: FooterProps) => (
  <footer className={cx('mf-footer', className)} {...rest}>
    {children}
    {(copyright || links) && (
      <div className="mf-footer-bottom">
        <div>{copyright}</div>
        {links && <div style={{ display: 'flex', gap: 'var(--mf-spacing-md)' }}>{links}</div>}
      </div>
    )}
  </footer>
);
