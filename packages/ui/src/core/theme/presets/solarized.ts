import { createPresetColors } from './createPreset';
import type { ThemePreset } from './types';

export const solarized: ThemePreset = {
  name: 'Solarized',
  description: "Ethan Schoonover's classic — warm, low-contrast, easy on the eyes.",
  light: {
    colors: createPresetColors({
      mode: 'light',
      background: '#fdf6e3',
      surface: '#fdf6e3',
      surfaceAlt: '#eee8d5',
      border: '#93a1a1',
      borderSubtle: '#d3cdb6',
      text: '#586e75',
      textMuted: '#839496',
      primary: '#268bd2',
      secondary: '#586e75',
      success: '#859900',
      warning: '#b58900',
      danger: '#dc322f',
      info: '#2aa198',
    }),
  },
  dark: {
    colors: createPresetColors({
      mode: 'dark',
      background: '#002b36',
      surface: '#073642',
      surfaceAlt: '#0a3a45',
      border: '#586e75',
      borderSubtle: '#1d4753',
      text: '#93a1a1',
      textMuted: '#839496',
      primary: '#268bd2',
      secondary: '#93a1a1',
      success: '#859900',
      warning: '#b58900',
      danger: '#dc322f',
      info: '#2aa198',
    }),
  },
};
