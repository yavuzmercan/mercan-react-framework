import { Children, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';
import { Avatar } from './Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, size = 'md', className, children, ...rest }, ref) => {
    const items = Children.toArray(children);
    const visible = max ? items.slice(0, max) : items;
    const overflow = max ? items.length - max : 0;
    return (
      <div ref={ref} className={cx('mf-avatar-group', className)} {...rest}>
        {visible}
        {overflow > 0 && <Avatar name={`+${overflow}`} size={size} />}
      </div>
    );
  },
);
AvatarGroup.displayName = 'AvatarGroup';
