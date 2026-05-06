import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useColorMode } from '../../core';

const ColorModeReadout = ({ buttonLabel = 'toggle' }: { buttonLabel?: string }) => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  return (
    <div>
      <span data-testid="mode">{colorMode}</span>
      <button onClick={toggleColorMode}>{buttonLabel}</button>
      <button onClick={() => setColorMode('dark')}>force-dark</button>
    </div>
  );
};

describe('ThemeProvider color mode persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('uses defaultColorMode when nothing is stored', () => {
    render(
      <ThemeProvider defaultColorMode="light">
        <ColorModeReadout />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });

  it('hydrates from localStorage on mount', () => {
    localStorage.setItem('mf-color-mode', 'dark');
    render(
      <ThemeProvider defaultColorMode="light">
        <ColorModeReadout />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });

  it('persists toggleColorMode to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultColorMode="light">
        <ColorModeReadout />
      </ThemeProvider>,
    );
    await user.click(screen.getByText('toggle'));
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(localStorage.getItem('mf-color-mode')).toBe('dark');
  });

  it('persists setColorMode to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultColorMode="light">
        <ColorModeReadout />
      </ThemeProvider>,
    );
    await user.click(screen.getByText('force-dark'));
    expect(localStorage.getItem('mf-color-mode')).toBe('dark');
  });

  it('respects custom storage key', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultColorMode="light" colorModeStorageKey="my-theme">
        <ColorModeReadout />
      </ThemeProvider>,
    );
    await user.click(screen.getByText('toggle'));
    expect(localStorage.getItem('my-theme')).toBe('dark');
    expect(localStorage.getItem('mf-color-mode')).toBeNull();
  });

  it('opt-out: persistColorMode={false} does not write to storage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultColorMode="light" persistColorMode={false}>
        <ColorModeReadout />
      </ThemeProvider>,
    );
    await user.click(screen.getByText('toggle'));
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(localStorage.getItem('mf-color-mode')).toBeNull();
  });

  it('ignores invalid stored values', () => {
    localStorage.setItem('mf-color-mode', 'auto-something-bogus');
    render(
      <ThemeProvider defaultColorMode="light">
        <ColorModeReadout />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });
});
