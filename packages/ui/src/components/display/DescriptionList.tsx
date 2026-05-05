import { Fragment, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface DescriptionListItem {
  term: ReactNode;
  description: ReactNode;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionListItem[];
}

export const DescriptionList = ({ items, className, ...rest }: DescriptionListProps) => (
  <dl className={cx('mf-dl', className)} {...rest}>
    {items.map((item, i) => (
      <Fragment key={i}>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </Fragment>
    ))}
  </dl>
);
