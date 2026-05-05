import { useCallback } from 'react';

export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

export interface UseShareReturn {
  share: (data: ShareData) => Promise<boolean>;
  isSupported: boolean;
}

/** Web Share API wrapper. Returns `share()` that resolves to true on success. */
export const useShare = (): UseShareReturn => {
  const isSupported = typeof navigator !== 'undefined' && 'share' in navigator;

  const share = useCallback(async (data: ShareData): Promise<boolean> => {
    if (!isSupported) return false;
    try {
      await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share(data);
      return true;
    } catch {
      return false;
    }
  }, [isSupported]);

  return { share, isSupported };
};
