import { useState, type ReactNode } from 'react';

export interface TooltipProps {
  label: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
}

export const Tooltip = ({ label, placement = 'top', children }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const positionStyle: React.CSSProperties = (() => {
    switch (placement) {
      case 'bottom':
        return { top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { right: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { left: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' };
      case 'top':
      default:
        return { bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' };
    }
  })();

  return (
    <span
      className="mf-tooltip-trigger"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="mf-tooltip" role="tooltip" style={positionStyle}>
          {label}
        </span>
      )}
    </span>
  );
};
