import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
  createPresetColors,
  presets,
  ThemeProvider,
  useTheme,
} from '../../core';

describe('createPresetColors', () => {
  it('expands minimal input to full ThemeColors', () => {
    const colors = createPresetColors({
      mode: 'light',
      background: '#ffffff',
      surfaceAlt: '#f5f5f5',
      border: '#dddddd',
      text: '#111111',
      primary: '#3b6cff',
      success: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0284c7',
    });
    // All 26 slots should be present
    expect(colors.background).toBe('#ffffff');
    expect(colors.primary).toBe('#3b6cff');
    expect(colors.primaryHover).toBeDefined();
    expect(colors.primaryActive).toBeDefined();
    expect(colors.primaryContrast).toBeDefined();
    expect(colors.successContrast).toBeDefined();
    expect(colors.dangerHover).toBeDefined();
    expect(colors.focusRing).toMatch(/^rgba\(/);
    expect(colors.textInverse).toBe('#ffffff');
  });

  it('produces different overlay alpha for light vs dark mode', () => {
    const light = createPresetColors({
      mode: 'light',
      background: '#fff', surfaceAlt: '#eee', border: '#ddd', text: '#111',
      primary: '#3b6cff', success: '#0a0', warning: '#fa0', danger: '#a00', info: '#06c',
    });
    const dark = createPresetColors({
      mode: 'dark',
      background: '#111', surfaceAlt: '#222', border: '#333', text: '#fff',
      primary: '#3b6cff', success: '#0a0', warning: '#fa0', danger: '#a00', info: '#06c',
    });
    expect(light.overlay).not.toBe(dark.overlay);
  });
});

describe('presets export', () => {
  it('exposes all 8 built-in presets with light + dark', () => {
    const expected = ['solarized', 'nord', 'dracula', 'github', 'monokai', 'material', 'tailwind', 'oneDark'];
    expected.forEach((name) => {
      expect(presets).toHaveProperty(name);
      const p = presets[name as keyof typeof presets];
      expect(p.name).toBeDefined();
      expect(p.light.colors).toBeDefined();
      expect(p.dark.colors).toBeDefined();
    });
  });
});

describe('ThemeProvider with preset', () => {
  const Probe = ({ onTheme }: { onTheme: (theme: ReturnType<typeof useTheme>) => void }) => {
    const theme = useTheme();
    onTheme(theme);
    return null;
  };

  it('applies preset colors via light/dark override', () => {
    let capturedTheme: ReturnType<typeof useTheme> | null = null;
    render(
      <ThemeProvider
        defaultColorMode="light"
        light={presets.nord.light}
        persistColorMode={false}
      >
        <Probe onTheme={(t) => { capturedTheme = t; }} />
      </ThemeProvider>,
    );
    expect(capturedTheme).not.toBeNull();
    // Nord light primary
    expect(capturedTheme!.colors.primary).toBe('#5e81ac');
  });

  it('user override beats preset colors (precedence test)', () => {
    let capturedTheme: ReturnType<typeof useTheme> | null = null;
    const userOverride = {
      ...presets.nord.light,
      colors: { ...presets.nord.light.colors, primary: '#ff5a5f' },
    };
    render(
      <ThemeProvider
        defaultColorMode="light"
        light={userOverride}
        persistColorMode={false}
      >
        <Probe onTheme={(t) => { capturedTheme = t; }} />
      </ThemeProvider>,
    );
    expect(capturedTheme!.colors.primary).toBe('#ff5a5f');
  });
});
