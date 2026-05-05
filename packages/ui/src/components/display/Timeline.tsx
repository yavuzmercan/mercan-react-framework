import { type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../core';

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Timeline = ({ className, children, ...rest }: TimelineProps) => (
  <div className={cx('mf-timeline', className)} {...rest}>
    {children}
  </div>
);

export interface TimelineItemProps {
  dot?: ReactNode;
  dotColor?: string;
  children: ReactNode;
  isLast?: boolean;
}

export const TimelineItem = ({ dot, dotColor, children, isLast }: TimelineItemProps) => (
  <div className="mf-timeline-item">
    <div className="mf-timeline-rail">
      {dot ?? (
        <span
          className="mf-timeline-dot"
          style={dotColor ? { background: dotColor } : undefined}
        />
      )}
      {!isLast && <div className="mf-timeline-line" />}
    </div>
    <div className="mf-timeline-content">{children}</div>
  </div>
);
