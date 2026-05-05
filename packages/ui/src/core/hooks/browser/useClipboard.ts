import { useCallback, useState } from 'react';

export interface UseClipboardReturn {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
  isSupported: boolean;
}

/** Copy to clipboard with a `copied` flag that auto-resets after `timeout` ms. */
export const useClipboard = (timeout = 1500): UseClipboardReturn => {
  const isSupported = typeof navigator !== 'undefined' && !!navigator.clipboard;
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!isSupported) return false;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeout > 0) {
          window.setTimeout(() => setCopied(false), timeout);
        }
        return true;
      } catch {
        return false;
      }
    },
    [isSupported, timeout],
  );

  return { copy, copied, isSupported };
};
