import { Fragment, type ReactNode } from 'react';
import { cx } from '../../core';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export const Breadcrumb = ({ items, separator = '/', className }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className={cx('mf-breadcrumb', className)}>
    {items.map((item, i) => {
      const last = i === items.length - 1;
      return (
        <Fragment key={i}>
          {last ? (
            <span className="mf-breadcrumb-current" aria-current="page">
              {item.label}
            </span>
          ) : item.href ? (
            <a href={item.href} onClick={item.onClick}>
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              style={{ background: 'transparent', border: 0, padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}
            >
              {item.label}
            </button>
          )}
          {!last && <span className="mf-breadcrumb-sep" aria-hidden="true">{separator}</span>}
        </Fragment>
      );
    })}
  </nav>
);
