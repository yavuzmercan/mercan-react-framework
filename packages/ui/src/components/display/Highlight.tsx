import { type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';
import type { ColorScheme } from '../types';

export interface HighlightProps extends HTMLAttributes<HTMLElement> {
  colorScheme?: ColorScheme;
  children: ReactNode;
}

export const Highlight = ({ colorScheme, className, children, ...rest }: HighlightProps) => (
  <mark className={cx('mf-mark', className)} data-scheme={colorScheme} {...rest}>
    {children}
  </mark>
);
