import { contrastColor, createBrandPalette, darken, lighten, rgba } from '../colorUtils';
import type { ThemeColors } from '../types';

export interface PresetColorsInput {
  mode: 'light' | 'dark';
  background: string;
  /** Defaults to `background`. */
  surface?: string;
  surfaceAlt: string;
  border: string;
  /** Defaults to a subtler version of `border`. */
  borderSubtle?: string;
  text: string;
  /** Defaults to a softened version of `text`. */
  textMuted?: string;
  primary: string;
  /** Defaults to `textMuted`. */
  secondary?: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  /** Background of overlays (modal/drawer scrim). Defaults to a sensible dark rgba. */
  overlay?: string;
}

/**
 * Expand a 12-input palette into the full 26-slot `ThemeColors` object.
 * Hover/active/contrast values are derived automatically.
 */
export const createPresetColors = (input: PresetColorsInput): ThemeColors => {
  const isDark = input.mode === 'dark';
  const surface = input.surface ?? input.background;
  const textMuted = input.textMuted ?? (isDark ? darken(input.text, 0.18) : lighten(input.text, 0.25));
  const secondary = input.secondary ?? textMuted;
  const borderSubtle = input.borderSubtle ?? (isDark ? darken(input.border, 0.04) : lighten(input.border, 0.04));
  const overlay = input.overlay ?? (isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)');

  const p = createBrandPalette({ primary: input.primary, mode: input.mode });

  return {
    background: input.background,
    surface,
    surfaceAlt: input.surfaceAlt,
    border: input.border,
    borderSubtle,
    text: input.text,
    textMuted,
    textInverse: input.background,
    primary: input.primary,
    primaryHover: p.primaryHover,
    primaryActive: p.primaryActive,
    primaryContrast: p.primaryContrast,
    secondary,
    secondaryHover: isDark ? lighten(secondary, 0.08) : darken(secondary, 0.08),
    secondaryContrast: contrastColor(secondary),
    success: input.success,
    successContrast: contrastColor(input.success),
    warning: input.warning,
    warningContrast: contrastColor(input.warning),
    danger: input.danger,
    dangerHover: isDark ? lighten(input.danger, 0.08) : darken(input.danger, 0.08),
    dangerContrast: contrastColor(input.danger),
    info: input.info,
    infoContrast: contrastColor(input.info),
    overlay,
    focusRing: rgba(input.primary, 0.45),
  };
};
