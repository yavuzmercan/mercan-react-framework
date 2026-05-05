import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { themeToCssVars } from './cssVars';
import { mergeTheme } from './mergeTheme';
import type { Theme, ThemeOverride } from './types';

export type ColorMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultColorMode?: ColorMode;
  light?: ThemeOverride;
  dark?: ThemeOverride;
  scope?: 'root' | 'local';
}

export const ThemeProvider = ({
  children,
  defaultColorMode = 'light',
  light,
  dark,
  scope = 'root',
}: ThemeProviderProps) => {
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode);

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
      toggleColorMode: () => setColorMode((m) => (m === 'light' ? 'dark' : 'light')),
    }),
    [theme, colorMode],
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
