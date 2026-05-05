import { useCallback, useEffect, useState, type RefObject } from 'react';

export interface UseFullscreenReturn {
  isFullscreen: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
  isSupported: boolean;
}

/**
 * Fullscreen API wrapper. Pass a ref to fullscreen a specific element,
 * omit it to fullscreen <html>.
 */
export const useFullscreen = <T extends HTMLElement>(ref?: RefObject<T | null>): UseFullscreenReturn => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const isSupported = typeof document !== 'undefined' && document.fullscreenEnabled;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = useCallback(async () => {
    if (typeof document === 'undefined') return;
    const target = ref?.current ?? document.documentElement;
    await target.requestFullscreen();
  }, [ref]);

  const exit = useCallback(async () => {
    if (typeof document === 'undefined' || !document.fullscreenElement) return;
    await document.exitFullscreen();
  }, []);

  const toggle = useCallback(async () => {
    if (typeof document === 'undefined') return;
    if (document.fullscreenElement) await exit();
    else await enter();
  }, [enter, exit]);

  return { isFullscreen, enter, exit, toggle, isSupported };
};
