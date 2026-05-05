import { useEffect, useState } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

/** Track window inner width/height. Updates on resize. */
export const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(() => ({
    width: typeof window === 'undefined' ? 0 : window.innerWidth,
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
};
