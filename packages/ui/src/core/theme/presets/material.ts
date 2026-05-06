import { createPresetColors } from './createPreset';
import type { ThemePreset } from './types';

// Material 3 — Google's design system
export const material: ThemePreset = {
  name: 'Material',
  description: 'Material Design 3 — purple primary, soft surfaces.',
  light: {
    colors: createPresetColors({
      mode: 'light',
      background: '#fffbfe',
      surface: '#ffffff',
      surfaceAlt: '#f3edf7',
      border: '#cac4d0',
      borderSubtle: '#e7e0ec',
      text: '#1c1b1f',
      textMuted: '#49454f',
      primary: '#6750a4',
      secondary: '#625b71',
      success: '#386a20',
      warning: '#7a5900',
      danger: '#b3261e',
      info: '#0061a4',
    }),
  },
  dark: {
    colors: createPresetColors({
      mode: 'dark',
      background: '#1c1b1f',
      surface: '#2b2930',
      surfaceAlt: '#36343b',
      border: '#49454f',
      borderSubtle: '#322f37',
      text: '#e6e1e5',
      textMuted: '#cac4d0',
      primary: '#d0bcff',
      secondary: '#ccc2dc',
      success: '#a3d28a',
      warning: '#dcc185',
      danger: '#f2b8b5',
      info: '#9ecaff',
    }),
  },
};
