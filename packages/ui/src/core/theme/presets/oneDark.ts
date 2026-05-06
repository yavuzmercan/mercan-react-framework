import { createPresetColors } from './createPreset';
import type { ThemePreset } from './types';

// One Dark / One Light — Atom & VS Code "One" theme
export const oneDark: ThemePreset = {
  name: 'One Dark',
  description: "Atom's One Dark/Light — calm blue primary, balanced grays.",
  light: {
    colors: createPresetColors({
      mode: 'light',
      background: '#fafafa',
      surface: '#ffffff',
      surfaceAlt: '#f0f0f0',
      border: '#d4d4d4',
      borderSubtle: '#e5e5e5',
      text: '#383a42',
      textMuted: '#a0a1a7',
      primary: '#4078f2',
      secondary: '#a626a4',
      success: '#50a14f',
      warning: '#c18401',
      danger: '#e45649',
      info: '#0184bc',
    }),
  },
  dark: {
    colors: createPresetColors({
      mode: 'dark',
      background: '#282c34',
      surface: '#2c313a',
      surfaceAlt: '#353b45',
      border: '#3e4451',
      borderSubtle: '#2c313a',
      text: '#abb2bf',
      textMuted: '#5c6370',
      primary: '#61afef',
      secondary: '#c678dd',
      success: '#98c379',
      warning: '#e5c07b',
      danger: '#e06c75',
      info: '#56b6c2',
    }),
  },
};
