import { cloneElement, isValidElement, useEffect, useRef, type ButtonHTMLAttributes, type KeyboardEvent, type ReactElement, type ReactNode } from 'react';
import { cx, useClickOutside, useDisclosure, useEscape } from '../../core';

export interface MenuProps {
  trigger: ReactElement;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

const focusableItems = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'));

export const Menu = ({ trigger, children, align = 'left', className }: MenuProps) => {
  const { isOpen, toggle, close } = useDisclosure();
  const ref = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(ref, close, isOpen);
  useEscape(close, isOpen);

  // Focus first item when opened
  useEffect(() => {
    if (!isOpen) return;
    const items = menuRef.current ? focusableItems(menuRef.current) : [];
    items[0]?.focus();
  }, [isOpen]);

  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!menuRef.current) return;
    const items = focusableItems(menuRef.current);
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = idx === -1 ? 0 : (idx + 1) % items.length;
      items[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = idx === -1 ? items.length - 1 : (idx - 1 + items.length) % items.length;
      items[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  const triggerEl = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          (trigger.props as any).onClick?.(e);
          toggle();
        },
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
      })
    : trigger;

  return (
    <span ref={ref} className="mf-menu-trigger">
      {triggerEl}
      {isOpen && (
        <div
          ref={menuRef}
          className={cx('mf-menu', className)}
          role="menu"
          style={{
            top: 'calc(100% + 4px)',
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
          }}
          onClick={() => close()}
          onKeyDown={onMenuKey}
        >
          {children}
        </div>
      )}
    </span>
  );
};

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const MenuItem = ({ className, ...rest }: MenuItemProps) => (
  <button type="button" role="menuitem" className={cx('mf-menu-item', className)} {...rest} />
);

export const MenuDivider = () => <div className="mf-menu-divider" role="separator" />;
