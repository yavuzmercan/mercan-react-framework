import { useEffect, useState, type RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Stop observing once the element first becomes visible. */
  freezeOnceVisible?: boolean;
}

/** Track whether an element is intersecting the viewport (or root). */
export const useIntersectionObserver = <T extends Element>(
  ref: RefObject<T | null>,
  options: UseIntersectionObserverOptions = {},
): { entry: IntersectionObserverEntry | null; isIntersecting: boolean } => {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const el = ref.current;
    if (!el || frozen || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([newEntry]) => setEntry(newEntry ?? null),
      { threshold, root, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, JSON.stringify(threshold), root, rootMargin, frozen]);

  return { entry, isIntersecting: entry?.isIntersecting ?? false };
};
