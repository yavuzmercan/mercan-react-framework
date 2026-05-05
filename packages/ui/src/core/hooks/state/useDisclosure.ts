import { useCallback, useState } from 'react';

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useDisclosure = (options: UseDisclosureOptions = {}) => {
  const [isOpen, setIsOpen] = useState(options.defaultOpen ?? false);

  const open = useCallback(() => {
    setIsOpen(true);
    options.onOpen?.();
  }, [options]);

  const close = useCallback(() => {
    setIsOpen(false);
    options.onClose?.();
  }, [options]);

  const toggle = useCallback(() => {
    setIsOpen((v) => {
      const next = !v;
      if (next) options.onOpen?.();
      else options.onClose?.();
      return next;
    });
  }, [options]);

  return { isOpen, open, close, toggle, setIsOpen };
};
