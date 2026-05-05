import { useEffect } from 'react';

/** Lock body scroll while the hook is active. Useful for modals/drawers. */
export const useScrollLock = (locked = true) => {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
};
