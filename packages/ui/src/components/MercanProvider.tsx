import { useEffect, useMemo, type ReactNode } from 'react';
import {
  I18nProvider,
  ThemeProvider,
  createBrandPalette,
  fontStack,
  loadGoogleFonts,
  presets,
  type ColorMode,
  type GoogleFontConfig,
  type I18nResources,
  type Locale,
  type PresetName,
  type ThemeOverride,
} from '../core';
import { ToastProvider, type ToastPosition } from './feedback/Toast';

export interface BrandColors {
  primary?: string;
  secondary?: string;
}

export type FontInput = string | GoogleFontConfig;

export interface GoogleFontsConfig {
  body?: FontInput;
  heading?: FontInput;
  mono?: FontInput;
  fallback?: { body?: string; heading?: string; mono?: string };
}

export interface MercanProviderProps {
  children: ReactNode;
  defaultColorMode?: ColorMode;
  /** Quick-set the brand colors. hover/active/contrast are derived automatically. */
  brand?: BrandColors;
  /** Same as brand, but only applied in dark mode. Falls back to `brand` if omitted. */
  darkBrand?: BrandColors;
  /** Full token override for light mode. Merged after `brand`. */
  lightOverride?: ThemeOverride;
  /** Full token override for dark mode. Merged after `darkBrand`. */
  darkOverride?: ThemeOverride;
  /** Auto-loads Google Fonts and wires them into theme.fonts. */
  googleFonts?: GoogleFontsConfig;
  /** Apply a built-in theme preset (Solarized, Nord, Dracula, GitHub, etc.). Merged before brand/fonts/overrides. */
  preset?: PresetName;
  /** Persist the chosen color mode to localStorage and rehydrate on next visit. Default `true`. */
  persistColorMode?: boolean;
  /** localStorage key for persisted color mode. Default `'mf-color-mode'`. */
  colorModeStorageKey?: string;
  locale: Locale;
  resources: I18nResources;
  fallbackLocale?: Locale;
  toastPosition?: ToastPosition;
}

const toFontConfig = (input: FontInput | undefined): GoogleFontConfig | undefined => {
  if (!input) return undefined;
  if (typeof input === 'string') return { family: input };
  return input;
};

const familyOf = (input: FontInput | undefined): string | undefined => {
  if (!input) return undefined;
  return typeof input === 'string' ? input : input.family;
};

const brandToOverride = (brand: BrandColors | undefined, mode: 'light' | 'dark'): ThemeOverride | undefined => {
  if (!brand?.primary && !brand?.secondary) return undefined;
  const palette = createBrandPalette({
    primary: brand.primary ?? '#3b6cff',
    secondary: brand.secondary,
    mode,
  });
  const colors: any = { ...palette };
  if (!brand.primary) {
    delete colors.primary;
    delete colors.primaryHover;
    delete colors.primaryActive;
    delete colors.primaryContrast;
  }
  return { colors };
};

const fontsToOverride = (config: GoogleFontsConfig | undefined): ThemeOverride | undefined => {
  if (!config) return undefined;
  const fonts: any = {};
  const bodyFamily = familyOf(config.body);
  const headingFamily = familyOf(config.heading);
  const monoFamily = familyOf(config.mono);
  if (bodyFamily) fonts.body = fontStack(bodyFamily, config.fallback?.body);
  if (headingFamily) fonts.heading = fontStack(headingFamily, config.fallback?.heading);
  if (monoFamily) fonts.mono = fontStack(monoFamily, config.fallback?.mono ?? 'ui-monospace, monospace');
  if (Object.keys(fonts).length === 0) return undefined;
  return { fonts };
};

const mergeOverrides = (...overrides: Array<ThemeOverride | undefined>): ThemeOverride | undefined => {
  const all = overrides.filter(Boolean) as ThemeOverride[];
  if (all.length === 0) return undefined;
  return all.reduce<ThemeOverride>((acc, cur) => ({
    ...acc,
    ...cur,
    colors: { ...(acc.colors ?? {}), ...(cur.colors ?? {}) },
    fonts: { ...(acc.fonts ?? {}), ...(cur.fonts ?? {}) },
  }), {});
};

export const MercanProvider = ({
  children,
  defaultColorMode = 'light',
  brand,
  darkBrand,
  lightOverride,
  darkOverride,
  googleFonts,
  preset,
  persistColorMode = true,
  colorModeStorageKey,
  locale,
  resources,
  fallbackLocale,
  toastPosition,
}: MercanProviderProps) => {
  // Load Google Fonts (idempotent)
  useEffect(() => {
    if (!googleFonts) return;
    const fonts = [
      toFontConfig(googleFonts.body),
      toFontConfig(googleFonts.heading),
      toFontConfig(googleFonts.mono),
    ].filter(Boolean) as GoogleFontConfig[];
    if (fonts.length > 0) loadGoogleFonts(fonts);
  }, [googleFonts]);

  const fontsOverride = useMemo(() => fontsToOverride(googleFonts), [googleFonts]);
  const presetLight = preset ? presets[preset]?.light : undefined;
  const presetDark = preset ? presets[preset]?.dark : undefined;

  // Precedence (last wins): preset → brand → fonts → user override
  const mergedLight = useMemo(
    () => mergeOverrides(presetLight, brandToOverride(brand, 'light'), fontsOverride, lightOverride),
    [presetLight, brand, fontsOverride, lightOverride],
  );
  const mergedDark = useMemo(
    () => mergeOverrides(presetDark, brandToOverride(darkBrand ?? brand, 'dark'), fontsOverride, darkOverride),
    [presetDark, darkBrand, brand, fontsOverride, darkOverride],
  );

  return (
    <ThemeProvider
      defaultColorMode={defaultColorMode}
      light={mergedLight}
      dark={mergedDark}
      persistColorMode={persistColorMode}
      colorModeStorageKey={colorModeStorageKey}
    >
      <I18nProvider resources={resources} defaultLocale={locale} fallbackLocale={fallbackLocale}>
        <ToastProvider position={toastPosition}>
          <div className="mf-root">{children}</div>
        </ToastProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};
