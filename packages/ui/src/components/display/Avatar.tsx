import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cx } from '../../core';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const initials = (name?: string) => {
  if (!name) return '?';
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size = 'md', className, ...rest }, ref) => {
    const [errored, setErrored] = useState(false);
    const showImg = src && !errored;
    return (
      <div ref={ref} className={cx('mf-avatar', className)} data-size={size} {...rest}>
        {showImg ? (
          <img src={src} alt={alt ?? name ?? ''} onError={() => setErrored(true)} />
        ) : (
          <span aria-hidden="true">{initials(name)}</span>
        )}
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';
