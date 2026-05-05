import { useEffect, useState, type RefObject } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

/** Track scroll position of window or a referenced element. */
export const useScrollPosition = <T extends HTMLElement>(
  ref?: RefObject<T | null>,
): ScrollPosition => {
  const [pos, setPos] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const target: HTMLElement | Window | null = ref ? ref.current : (typeof window !== 'undefined' ? window : null);
    if (!target) return;
    const isWindow = target === window;
    const handler = () => {
      if (isWindow) {
        setPos({ x: window.scrollX, y: window.scrollY });
      } else {
        const el = target as HTMLElement;
        setPos({ x: el.scrollLeft, y: el.scrollTop });
      }
    };
    handler();
    target.addEventListener('scroll', handler, { passive: true });
    return () => target.removeEventListener('scroll', handler);
  }, [ref]);

  return pos;
};
