import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { themeToCssVars } from './cssVars';
import { mergeTheme } from './mergeTheme';
import type { Theme, ThemeOverride } from './types';

export type ColorMode = 'light' | 'dark';
export type ColorModePreference = ColorMode | 'system';

const DEFAULT_STORAGE_KEY = 'mf-color-mode';

interface ThemeContextValue {
  theme: Theme;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial color mode when nothing is persisted. Defaults to `'light'`. */
  defaultColorMode?: ColorMode;
  /** Override for the light theme. */
  light?: ThemeOverride;
  /** Override for the dark theme. */
  dark?: ThemeOverride;
  /** Where to apply CSS variables: `'root'` writes to <html>, `'local'` wraps children in a scoped div. */
  scope?: 'root' | 'local';
  /** Persist the color mode to `localStorage`. Default `true`. */
  persistColorMode?: boolean;
  /** localStorage key for the persisted color mode. Default `'mf-color-mode'`. */
  colorModeStorageKey?: string;
}

const isBrowser = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readStoredMode = (key: string): ColorMode | null => {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === 'light' || raw === 'dark' ? raw : null;
  } catch {
    return null;
  }
};

const writeStoredMode = (key: string, mode: ColorMode): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, mode);
  } catch {
    /* quota / disabled */
  }
};

export const ThemeProvider = ({
  children,
  defaultColorMode = 'light',
  light,
  dark,
  scope = 'root',
  persistColorMode = true,
  colorModeStorageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) => {
  // Initial state: prefer persisted value, then defaultColorMode.
  // SSR-safe: on server, falls back to defaultColorMode (no localStorage access).
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    if (!persistColorMode) return defaultColorMode;
    return readStoredMode(colorModeStorageKey) ?? defaultColorMode;
  });

  // Keep storage in sync with state changes
  const setColorMode = useCallback(
    (mode: ColorMode) => {
      setColorModeState(mode);
      if (persistColorMode) writeStoredMode(colorModeStorageKey, mode);
    },
    [persistColorMode, colorModeStorageKey],
  );

  const toggleColorMode = useCallback(() => {
    setColorModeState((m) => {
      const next = m === 'light' ? 'dark' : 'light';
      if (persistColorMode) writeStoredMode(colorModeStorageKey, next);
      return next;
    });
  }, [persistColorMode, colorModeStorageKey]);

  // Cross-tab sync — when another tab updates the stored mode, follow it
  useEffect(() => {
    if (!persistColorMode || !isBrowser()) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== colorModeStorageKey) return;
      if (e.newValue === 'light' || e.newValue === 'dark') {
        setColorModeState(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [persistColorMode, colorModeStorageKey]);

  const theme = useMemo<Theme>(() => {
    const base = colorMode === 'dark' ? darkTheme : lightTheme;
    const override = colorMode === 'dark' ? dark : light;
    return mergeTheme(base, override);
  }, [colorMode, light, dark]);

  const cssVars = useMemo(() => themeToCssVars(theme), [theme]);

  useEffect(() => {
    if (scope !== 'root') return;
    const root = document.documentElement;
    Object.entries(cssVars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.dataset.mfColorMode = colorMode;
    return () => {
      Object.keys(cssVars).forEach((k) => root.style.removeProperty(k));
      delete root.dataset.mfColorMode;
    };
  }, [cssVars, colorMode, scope]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colorMode,
      setColorMode,
      toggleColorMode,
    }),
    [theme, colorMode, setColorMode, toggleColorMode],
  );

  if (scope === 'local') {
    return (
      <ThemeContext.Provider value={value}>
        <div style={cssVars as React.CSSProperties} data-mf-color-mode={colorMode}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
};
