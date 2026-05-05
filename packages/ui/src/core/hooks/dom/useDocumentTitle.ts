import { useEffect } from 'react';

/** Set document.title for the lifetime of the component. */
export const useDocumentTitle = (title: string, restoreOnUnmount = false) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prev = document.title;
    document.title = title;
    return () => {
      if (restoreOnUnmount) document.title = prev;
    };
  }, [title, restoreOnUnmount]);
};
