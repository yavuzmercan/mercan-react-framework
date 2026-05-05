import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: ReactNode;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-container', className)} data-size={size} {...rest}>
      {children}
    </div>
  ),
);
Container.displayName = 'Container';
