import { useCallback, type RefObject } from 'react';

/** Returns a function that scrolls the referenced element into view. */
export const useScrollIntoView = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  defaultOptions: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' },
): ((options?: ScrollIntoViewOptions) => void) => {
  return useCallback((options) => {
    const el = ref.current;
    if (!el) return;
    el.scrollIntoView(options ?? defaultOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};
