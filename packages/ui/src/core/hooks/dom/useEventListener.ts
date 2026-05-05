import { useEffect, useRef, type RefObject } from 'react';

type Target = Window | Document | HTMLElement | null;

/**
 * Strongly-typed addEventListener wrapper.
 * Pass a RefObject as `target` to listen on a DOM element, or omit to use window.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (e: WindowEventMap[K]) => void,
): void;
export function useEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (e: DocumentEventMap[K]) => void,
  target: RefObject<Document | null> | Document,
): void;
export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement>(
  type: K,
  listener: (e: HTMLElementEventMap[K]) => void,
  target: RefObject<T | null>,
): void;
export function useEventListener(
  type: string,
  listener: EventListener,
  target?: RefObject<Target> | Target,
): void {
  const handler = useRef(listener);
  handler.current = listener;

  useEffect(() => {
    const el: Target =
      target && 'current' in target ? target.current : (target as Target) ?? (typeof window !== 'undefined' ? window : null);
    if (!el || !el.addEventListener) return;
    const cb: EventListener = (e) => handler.current(e);
    el.addEventListener(type, cb);
    return () => el.removeEventListener(type, cb);
  }, [type, target]);
}
