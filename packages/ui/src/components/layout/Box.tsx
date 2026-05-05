import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cx, v } from '../../core';
import type { SpacingKey, RadiusKey } from '../types';

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  p?: SpacingKey;
  px?: SpacingKey;
  py?: SpacingKey;
  m?: SpacingKey;
  mx?: SpacingKey;
  my?: SpacingKey;
  bg?: 'background' | 'surface' | 'surfaceAlt';
  radius?: RadiusKey;
  border?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  children?: ReactNode;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: Tag = 'div', p, px, py, m, mx, my, bg, radius, border, shadow, className, style, children, ...rest }, ref) => {
    const computed: React.CSSProperties = {
      ...(p && { padding: v.space(p) }),
      ...(px && { paddingInline: v.space(px) }),
      ...(py && { paddingBlock: v.space(py) }),
      ...(m && { margin: v.space(m) }),
      ...(mx && { marginInline: v.space(mx) }),
      ...(my && { marginBlock: v.space(my) }),
      ...(bg && { background: v.color(bg) }),
      ...(radius && { borderRadius: v.radius(radius) }),
      ...(border && { border: `1px solid ${v.color('border')}` }),
      ...(shadow && { boxShadow: v.shadow(shadow) }),
      ...style,
    };
    return (
      <Tag ref={ref as any} className={cx('mf-box', className)} style={computed} {...rest}>
        {children}
      </Tag>
    );
  },
);
Box.displayName = 'Box';
