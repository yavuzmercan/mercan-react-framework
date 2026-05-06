import type { ThemeOverride } from '../types';

export interface ThemePreset {
  name: string;
  description?: string;
  light: ThemeOverride;
  dark: ThemeOverride;
}
