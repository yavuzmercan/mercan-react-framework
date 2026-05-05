import { useRef, useState, type ReactNode } from 'react';

export interface HoverCardProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  openDelay?: number;
  closeDelay?: number;
}

export const HoverCard = ({
  trigger,
  children,
  placement = 'bottom',
  openDelay = 200,
  closeDelay = 150,
}: HoverCardProps) => {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelTimers = () => {
    if (openTimer.current !== null) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleEnter = () => {
    cancelTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), openDelay);
  };

  const handleLeave = () => {
    cancelTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  };

  const placementStyle: React.CSSProperties = (() => {
    switch (placement) {
      case 'top': return { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' };
      case 'left': return { right: 'calc(100% + 8px)', top: 0 };
      case 'right': return { left: 'calc(100% + 8px)', top: 0 };
      case 'bottom':
      default: return { top: 'calc(100% + 8px)', left: 0 };
    }
  })();

  return (
    <span className="mf-hover-trigger" onMouseEnter={handleEnter} onMouseLeave={handleLeave} onFocus={handleEnter} onBlur={handleLeave}>
      {trigger}
      {open && (
        <div className="mf-hover-card" role="dialog" style={placementStyle} onMouseEnter={cancelTimers} onMouseLeave={handleLeave}>
          {children}
        </div>
      )}
    </span>
  );
};
