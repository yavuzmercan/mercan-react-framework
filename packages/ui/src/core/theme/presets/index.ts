import { solarized } from './solarized';
import { nord } from './nord';
import { dracula } from './dracula';
import { github } from './github';
import { monokai } from './monokai';
import { material } from './material';
import { tailwind } from './tailwind';
import { oneDark } from './oneDark';

export { solarized, nord, dracula, github, monokai, material, tailwind, oneDark };
export { createPresetColors } from './createPreset';
export type { PresetColorsInput } from './createPreset';
export type { ThemePreset } from './types';

/** Map of all built-in presets, keyed by name. */
export const presets = {
  solarized,
  nord,
  dracula,
  github,
  monokai,
  material,
  tailwind,
  oneDark,
} as const;

export type PresetName = keyof typeof presets;
