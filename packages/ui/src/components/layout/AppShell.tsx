import { type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  navbar?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  sidebarWidth?: number | string;
  children: ReactNode;
}

export const AppShell = ({
  navbar,
  sidebar,
  footer,
  sidebarWidth = 240,
  className,
  style,
  children,
  ...rest
}: AppShellProps) => (
  <div
    className={cx('mf-appshell', className)}
    data-no-sidebar={!sidebar ? 'true' : undefined}
    data-no-footer={!footer ? 'true' : undefined}
    style={{
      gridTemplateColumns: sidebar
        ? `${typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth} 1fr`
        : '1fr',
      ...style,
    }}
    {...rest}
  >
    {navbar && <div className="mf-appshell-nav">{navbar}</div>}
    {sidebar && <aside className="mf-appshell-side">{sidebar}</aside>}
    <main className="mf-appshell-main">{children}</main>
    {footer && <div className="mf-appshell-foot">{footer}</div>}
  </div>
);
