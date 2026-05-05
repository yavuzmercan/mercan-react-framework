import { useId as reactUseId } from 'react';

export const useUniqueId = (prefix = 'mf'): string => {
  const id = reactUseId();
  return `${prefix}-${id.replace(/:/g, '')}`;
};
