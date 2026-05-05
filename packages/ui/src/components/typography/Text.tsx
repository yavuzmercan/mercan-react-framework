import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  tone?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  truncate?: boolean;
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = 'p', size = 'md', weight = 'regular', tone = 'default', truncate, align, className, style, children, ...rest }, ref) => (
    <Tag
      ref={ref as any}
      className={cx('mf-text', className)}
      data-size={size}
      data-weight={weight}
      data-tone={tone === 'default' ? undefined : tone}
      data-truncate={truncate ? 'true' : undefined}
      style={{ textAlign: align, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  ),
);
Text.displayName = 'Text';
