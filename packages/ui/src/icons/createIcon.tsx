import { forwardRef, type ReactNode, type SVGAttributes } from 'react';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  title?: string;
}

export interface CreateIconOptions {
  displayName: string;
  viewBox?: string;
  paths: ReactNode;
  fill?: 'none' | 'currentColor';
}

export const createIcon = ({
  displayName,
  viewBox = '0 0 24 24',
  paths,
  fill: defaultFill = 'none',
}: CreateIconOptions) => {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ size = 20, color = 'currentColor', strokeWidth = 2, title, style, fill, ...rest }, ref) => {
      const fillMode = (fill ?? defaultFill) as 'none' | 'currentColor' | string;
      const isOutline = fillMode === 'none';
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={viewBox}
          fill={fillMode}
          stroke={isOutline ? color : fillMode === 'currentColor' ? 'none' : color}
          strokeWidth={isOutline ? strokeWidth : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }}
          role={title ? 'img' : undefined}
          aria-hidden={title ? undefined : true}
          aria-label={title}
          {...rest}
        >
          {title && <title>{title}</title>}
          {paths}
        </svg>
      );
    },
  );
  Icon.displayName = displayName;
  return Icon;
};
