import type { Theme } from './types';

const PREFIX = '--mf';

const flatten = (record: Record<string, string>, group: string): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const key in record) {
    out[`${PREFIX}-${group}-${key}`] = record[key]!;
  }
  return out;
};

export const themeToCssVars = (theme: Theme): Record<string, string> => ({
  ...flatten(theme.colors as unknown as Record<string, string>, 'color'),
  ...flatten(theme.spacing, 'spacing'),
  ...flatten(theme.radii, 'radius'),
  ...flatten(theme.fontSizes, 'fs'),
  ...flatten(theme.fontWeights, 'fw'),
  ...flatten(theme.lineHeights, 'lh'),
  ...flatten(theme.fonts, 'font'),
  ...flatten(theme.shadows, 'shadow'),
  ...flatten(theme.zIndices, 'z'),
  ...flatten(theme.durations, 'dur'),
  ...flatten(theme.breakpoints, 'bp'),
});

export const v = {
  color: (key: keyof Theme['colors']) => `var(${PREFIX}-color-${String(key)})`,
  space: (key: keyof Theme['spacing']) => `var(${PREFIX}-spacing-${String(key)})`,
  radius: (key: keyof Theme['radii']) => `var(${PREFIX}-radius-${String(key)})`,
  fs: (key: keyof Theme['fontSizes']) => `var(${PREFIX}-fs-${String(key)})`,
  fw: (key: keyof Theme['fontWeights']) => `var(${PREFIX}-fw-${String(key)})`,
  lh: (key: keyof Theme['lineHeights']) => `var(${PREFIX}-lh-${String(key)})`,
  font: (key: keyof Theme['fonts']) => `var(${PREFIX}-font-${String(key)})`,
  shadow: (key: keyof Theme['shadows']) => `var(${PREFIX}-shadow-${String(key)})`,
  z: (key: keyof Theme['zIndices']) => `var(${PREFIX}-z-${String(key)})`,
  dur: (key: keyof Theme['durations']) => `var(${PREFIX}-dur-${String(key)})`,
  bp: (key: keyof Theme['breakpoints']) => `var(${PREFIX}-bp-${String(key)})`,
};
