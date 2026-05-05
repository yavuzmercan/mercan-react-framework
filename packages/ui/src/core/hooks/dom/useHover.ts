import { useEffect, useState, type RefObject } from 'react';

/** Track whether an element is being hovered. */
export const useHover = <T extends HTMLElement>(ref: RefObject<T | null>): boolean => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, [ref]);

  return hovered;
};
