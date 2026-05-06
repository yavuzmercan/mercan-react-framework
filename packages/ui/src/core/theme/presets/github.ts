import { createPresetColors } from './createPreset';
import type { ThemePreset } from './types';

// GitHub Light & Dark
export const github: ThemePreset = {
  name: 'GitHub',
  description: "GitHub's familiar light & dark themes — neutral grays, blue primary.",
  light: {
    colors: createPresetColors({
      mode: 'light',
      background: '#ffffff',
      surface: '#ffffff',
      surfaceAlt: '#f6f8fa',
      border: '#d0d7de',
      borderSubtle: '#eaeef2',
      text: '#1f2328',
      textMuted: '#656d76',
      primary: '#0969da',
      secondary: '#656d76',
      success: '#1a7f37',
      warning: '#9a6700',
      danger: '#cf222e',
      info: '#0969da',
    }),
  },
  dark: {
    colors: createPresetColors({
      mode: 'dark',
      background: '#0d1117',
      surface: '#161b22',
      surfaceAlt: '#21262d',
      border: '#30363d',
      borderSubtle: '#21262d',
      text: '#e6edf3',
      textMuted: '#8d96a0',
      primary: '#2f81f7',
      secondary: '#8d96a0',
      success: '#3fb950',
      warning: '#d29922',
      danger: '#f85149',
      info: '#2f81f7',
    }),
  },
};
