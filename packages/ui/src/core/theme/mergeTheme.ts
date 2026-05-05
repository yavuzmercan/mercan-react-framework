import type { Theme, ThemeOverride } from './types';

export const mergeTheme = (base: Theme, override?: ThemeOverride): Theme => {
  if (!override) return base;
  const merged: any = { ...base };
  for (const key in override) {
    const k = key as keyof Theme;
    const value = (override as any)[k];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      merged[k] = { ...(base as any)[k], ...value };
    } else if (value !== undefined) {
      merged[k] = value;
    }
  }
  return merged as Theme;
};
