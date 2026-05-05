import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  createBrandPalette,
  contrastColor,
  cx,
  lighten,
  darken,
  useDisclosure,
  mergeTheme,
  lightTheme,
} from '../../core';

describe('cx', () => {
  it('joins truthy class names', () => {
    expect(cx('a', 'b', null, undefined, false, 'c')).toBe('a b c');
  });
  it('handles object form', () => {
    expect(cx({ a: true, b: false, c: 1 })).toBe('a c');
  });
  it('flattens arrays', () => {
    expect(cx(['a', ['b', { c: true }]])).toBe('a b c');
  });
});

describe('createBrandPalette', () => {
  it('derives hover/active/contrast from primary', () => {
    const p = createBrandPalette({ primary: '#3b6cff' });
    expect(p.primary).toBe('#3b6cff');
    expect(p.primaryHover).not.toBe(p.primary);
    expect(p.primaryActive).not.toBe(p.primaryHover);
    expect(p.primaryContrast).toMatch(/^#/);
  });
  it('includes secondary when given', () => {
    const p = createBrandPalette({ primary: '#000', secondary: '#888' });
    expect(p.secondary).toBe('#888');
    expect(p.secondaryHover).toBeDefined();
  });
});

describe('lighten / darken / contrastColor', () => {
  it('lighten returns a lighter shade', () => {
    expect(lighten('#000000', 0.5)).not.toBe('#000000');
  });
  it('darken returns a darker shade', () => {
    expect(darken('#ffffff', 0.5)).not.toBe('#ffffff');
  });
  it('contrastColor picks dark for light backgrounds', () => {
    expect(contrastColor('#ffffff')).toBe('#0b0d12');
  });
  it('contrastColor picks light for dark backgrounds', () => {
    expect(contrastColor('#000000')).toBe('#ffffff');
  });
});

describe('mergeTheme', () => {
  it('merges color overrides into base theme', () => {
    const merged = mergeTheme(lightTheme, { colors: { primary: '#ff0000' } });
    expect(merged.colors.primary).toBe('#ff0000');
    expect(merged.colors.background).toBe(lightTheme.colors.background);
  });
});

describe('useDisclosure', () => {
  it('starts closed and toggles', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
  });
});
