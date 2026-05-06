import { createPresetColors } from './createPreset';
import type { ThemePreset } from './types';

// Nord — arctic, north-bluish color palette
// https://www.nordtheme.com/
export const nord: ThemePreset = {
  name: 'Nord',
  description: 'Arctic, north-bluish palette by Arctic Ice Studio.',
  light: {
    colors: createPresetColors({
      mode: 'light',
      background: '#eceff4',
      surface: '#ffffff',
      surfaceAlt: '#e5e9f0',
      border: '#d8dee9',
      text: '#2e3440',
      textMuted: '#4c566a',
      primary: '#5e81ac',
      secondary: '#4c566a',
      success: '#a3be8c',
      warning: '#ebcb8b',
      danger: '#bf616a',
      info: '#88c0d0',
    }),
  },
  dark: {
    colors: createPresetColors({
      mode: 'dark',
      background: '#2e3440',
      surface: '#3b4252',
      surfaceAlt: '#434c5e',
      border: '#4c566a',
      text: '#eceff4',
      textMuted: '#d8dee9',
      primary: '#88c0d0',
      secondary: '#d8dee9',
      success: '#a3be8c',
      warning: '#ebcb8b',
      danger: '#bf616a',
      info: '#81a1c1',
    }),
  },
};
