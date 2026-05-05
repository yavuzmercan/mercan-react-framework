import { useThemeContext } from './ThemeProvider';
import type { Theme } from './types';

export const useTheme = (): Theme => useThemeContext().theme;

export const useColorMode = () => {
  const { colorMode, setColorMode, toggleColorMode } = useThemeContext();
  return { colorMode, setColorMode, toggleColorMode };
};
