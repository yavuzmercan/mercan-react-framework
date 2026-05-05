import { forwardRef, type HTMLAttributes, type LiHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  interactive?: boolean;
  children?: ReactNode;
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ interactive, className, children, ...rest }, ref) => (
    <ul
      ref={ref}
      className={cx('mf-list', className)}
      data-interactive={interactive ? 'true' : undefined}
      {...rest}
    >
      {children}
    </ul>
  ),
);
List.displayName = 'List';

export const ListItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  ({ className, children, ...rest }, ref) => (
    <li ref={ref} className={cx('mf-list-item', className)} {...rest}>
      {children}
    </li>
  ),
);
ListItem.displayName = 'ListItem';
