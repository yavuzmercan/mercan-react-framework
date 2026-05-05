export { createIcon } from './createIcon';
export type { IconProps, CreateIconOptions } from './createIcon';
export * from './icons';

import * as _allIcons from './icons';
import type { ForwardRefExoticComponent } from 'react';
import type { IconProps } from './createIcon';

/**
 * Map of every icon component, keyed by name. Useful for building icon pickers,
 * documentation pages, or fuzzy search over the available set.
 */
export const iconList = _allIcons as unknown as Record<
  string,
  ForwardRefExoticComponent<IconProps>
>;
