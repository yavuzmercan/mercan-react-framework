import { createPresetColors } from './createPreset';
import type { ThemePreset } from './types';

// Monokai — classic editor dark theme with bright accents
export const monokai: ThemePreset = {
  name: 'Monokai',
  description: 'Vibrant dark editor theme — pink, green, yellow accents on warm gray.',
  light: {
    // Monokai-inspired light variant — same accents on light bg
    colors: createPresetColors({
      mode: 'light',
      background: '#fafafa',
      surface: '#ffffff',
      surfaceAlt: '#f0f0eb',
      border: '#d8d8d0',
      text: '#272822',
      textMuted: '#75715e',
      primary: '#f92672',
      secondary: '#75715e',
      success: '#a6e22e',
      warning: '#e6db74',
      danger: '#f92672',
      info: '#66d9ef',
    }),
  },
  dark: {
    colors: createPresetColors({
      mode: 'dark',
      background: '#272822',
      surface: '#2d2e26',
      surfaceAlt: '#383830',
      border: '#49483e',
      borderSubtle: '#3a3a32',
      text: '#f8f8f2',
      textMuted: '#75715e',
      primary: '#f92672',
      secondary: '#a6e22e',
      success: '#a6e22e',
      warning: '#e6db74',
      danger: '#fd5e5e',
      info: '#66d9ef',
    }),
  },
};
