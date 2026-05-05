import { forwardRef, type ImgHTMLAttributes } from 'react';
import { cx } from '../../core';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  rounded?: boolean;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ rounded, className, alt = '', ...rest }, ref) => (
    <img
      ref={ref}
      className={cx('mf-image', className)}
      data-rounded={rounded ? 'true' : undefined}
      alt={alt}
      {...rest}
    />
  ),
);
Image.displayName = 'Image';
