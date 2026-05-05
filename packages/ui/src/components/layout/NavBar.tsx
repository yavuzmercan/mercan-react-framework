import { type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  brand?: ReactNode;
  actions?: ReactNode;
  sticky?: boolean;
  children?: ReactNode;
}

export const NavBar = ({ brand, actions, sticky, className, children, ...rest }: NavBarProps) => (
  <header className={cx('mf-navbar', className)} data-sticky={sticky ? 'true' : undefined} {...rest}>
    {brand && <div className="mf-navbar-brand">{brand}</div>}
    {children && <nav className="mf-navbar-nav">{children}</nav>}
    {actions && <div className="mf-navbar-actions">{actions}</div>}
  </header>
);
