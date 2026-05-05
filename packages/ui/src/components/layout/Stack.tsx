import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, v } from '../../core';
import type { SpacingKey } from '../types';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: SpacingKey;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
  children?: ReactNode;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    { direction = 'column', gap = 'md', justify, align, wrap, className, style, children, ...rest },
    ref,
  ) => (
    <div
      ref={ref}
      className={cx('mf-stack', className)}
      data-direction={direction}
      data-justify={justify}
      data-align={align}
      data-wrap={wrap ? 'true' : undefined}
      style={{ gap: v.space(gap), ...style }}
      {...rest}
    >
      {children}
    </div>
  ),
);
Stack.displayName = 'Stack';

export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} {...props} direction="row" />
));
HStack.displayName = 'HStack';

export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} {...props} direction="column" />
));
VStack.displayName = 'VStack';
