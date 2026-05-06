import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, useResponsiveValue, v, type ResponsiveValue } from '../../core';
import type { SpacingKey } from '../types';

export type StackDirection = 'row' | 'column';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: ResponsiveValue<StackDirection>;
  gap?: ResponsiveValue<SpacingKey>;
  justify?: ResponsiveValue<StackJustify>;
  align?: ResponsiveValue<StackAlign>;
  wrap?: ResponsiveValue<boolean>;
  children?: ReactNode;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ direction, gap, justify, align, wrap, className, style, children, ...rest }, ref) => {
    const dir = useResponsiveValue(direction) ?? 'column';
    const gp = useResponsiveValue(gap) ?? 'md';
    const jstfy = useResponsiveValue(justify);
    const algn = useResponsiveValue(align);
    const wrp = useResponsiveValue(wrap);

    return (
      <div
        ref={ref}
        className={cx('mf-stack', className)}
        data-direction={dir}
        data-justify={jstfy}
        data-align={algn}
        data-wrap={wrp ? 'true' : undefined}
        style={{ gap: v.space(gp as SpacingKey), ...style }}
        {...rest}
      >
        {children}
      </div>
    );
  },
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
