import type { Tokens } from './tokens';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderSubtle: string;
  text: string;
  textMuted: string;
  textInverse: string;
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryContrast: string;
  secondary: string;
  secondaryHover: string;
  secondaryContrast: string;
  success: string;
  successContrast: string;
  warning: string;
  warningContrast: string;
  danger: string;
  dangerHover: string;
  dangerContrast: string;
  info: string;
  infoContrast: string;
  overlay: string;
  focusRing: string;
}

export interface Theme {
  name: string;
  colorMode: 'light' | 'dark';
  colors: ThemeColors;
  spacing: Tokens['spacing'];
  radii: Tokens['radii'];
  fontSizes: Tokens['fontSizes'];
  fontWeights: Tokens['fontWeights'];
  lineHeights: Tokens['lineHeights'];
  fonts: Tokens['fonts'];
  shadows: Tokens['shadows'];
  zIndices: Tokens['zIndices'];
  durations: Tokens['durations'];
  breakpoints: Tokens['breakpoints'];
}

export type ThemeOverride = Partial<{
  [K in keyof Theme]: Theme[K] extends object ? Partial<Theme[K]> : Theme[K];
}>;
