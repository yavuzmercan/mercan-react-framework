import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ shadow, className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-card', className)} data-shadow={shadow ? 'true' : undefined} {...rest}>
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-card-header', className)} {...rest}>
      {children}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-card-body', className)} {...rest}>
      {children}
    </div>
  ),
);
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cx('mf-card-footer', className)} {...rest}>
      {children}
    </div>
  ),
);
CardFooter.displayName = 'CardFooter';
