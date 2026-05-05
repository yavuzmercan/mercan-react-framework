import { cloneElement, isValidElement, useRef, type ReactElement, type ReactNode } from 'react';
import { useClickOutside, useDisclosure, useEscape } from '../../core';

export interface PopoverProps {
  trigger: ReactElement;
  placement?: 'bottom' | 'top';
  children: ReactNode;
}

export const Popover = ({ trigger, placement = 'bottom', children }: PopoverProps) => {
  const { isOpen, toggle, close } = useDisclosure();
  const ref = useRef<HTMLSpanElement>(null);

  useClickOutside(ref, close, isOpen);
  useEscape(close, isOpen);

  const triggerEl = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          (trigger.props as any).onClick?.(e);
          toggle();
        },
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
      })
    : trigger;

  const positionStyle: React.CSSProperties =
    placement === 'top'
      ? { bottom: 'calc(100% + 8px)', left: 0 }
      : { top: 'calc(100% + 8px)', left: 0 };

  return (
    <span ref={ref} className="mf-popover-trigger">
      {triggerEl}
      {isOpen && (
        <div className="mf-popover" role="dialog" style={positionStyle}>
          {children}
        </div>
      )}
    </span>
  );
};
