import { createPresetColors } from './createPreset';
import type { ThemePreset } from './types';

// Dracula — https://draculatheme.com/
export const dracula: ThemePreset = {
  name: 'Dracula',
  description: 'Dark theme staple — vibrant pink and purple accents.',
  light: {
    // Dracula's signature accents on a light surface
    colors: createPresetColors({
      mode: 'light',
      background: '#f8f8f2',
      surface: '#ffffff',
      surfaceAlt: '#eeeed8',
      border: '#dcdcd0',
      text: '#282a36',
      textMuted: '#6272a4',
      primary: '#ff79c6',
      secondary: '#6272a4',
      success: '#50fa7b',
      warning: '#f1fa8c',
      danger: '#ff5555',
      info: '#8be9fd',
    }),
  },
  dark: {
    colors: createPresetColors({
      mode: 'dark',
      background: '#282a36',
      surface: '#282a36',
      surfaceAlt: '#44475a',
      border: '#6272a4',
      borderSubtle: '#3a3d4d',
      text: '#f8f8f2',
      textMuted: '#bd93f9',
      primary: '#ff79c6',
      secondary: '#bd93f9',
      success: '#50fa7b',
      warning: '#f1fa8c',
      danger: '#ff5555',
      info: '#8be9fd',
    }),
  },
};
