import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import {
  useBreakpoint,
  useBreakpointDown,
  useBreakpointUp,
  useBreakpointValue,
} from '../../core';

const setViewport = (width: number) => {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: width });
  window.dispatchEvent(new Event('resize'));
};

describe('useBreakpoint', () => {
  const originalWidth = window.innerWidth;
  beforeEach(() => {
    setViewport(1280);
  });
  afterEach(() => {
    setViewport(originalWidth);
    vi.clearAllMocks();
  });

  it('returns "base" below sm (640)', () => {
    setViewport(500);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('base');
  });

  it('returns "sm" between 640 and 768', () => {
    setViewport(700);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('sm');
  });

  it('returns "md" between 768 and 1024', () => {
    setViewport(900);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('md');
  });

  it('returns "lg" between 1024 and 1280', () => {
    setViewport(1100);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('lg');
  });

  it('returns "xl" between 1280 and 1536', () => {
    setViewport(1400);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('xl');
  });

  it('updates on window resize', () => {
    setViewport(500);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('base');
    act(() => setViewport(1100));
    expect(result.current).toBe('lg');
  });
});

describe('useBreakpointUp', () => {
  it('true at and above the named breakpoint', () => {
    setViewport(900);
    const { result: md } = renderHook(() => useBreakpointUp('md'));
    expect(md.current).toBe(true);
    const { result: lg } = renderHook(() => useBreakpointUp('lg'));
    expect(lg.current).toBe(false);
  });
});

describe('useBreakpointDown', () => {
  it('true below the named breakpoint', () => {
    setViewport(700);
    const { result: md } = renderHook(() => useBreakpointDown('md'));
    expect(md.current).toBe(true);
    const { result: sm } = renderHook(() => useBreakpointDown('sm'));
    expect(sm.current).toBe(false);
  });
});

describe('useBreakpointValue', () => {
  it('picks the value matching the active breakpoint', () => {
    setViewport(900); // md
    const { result } = renderHook(() =>
      useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 }),
    );
    expect(result.current).toBe(3);
  });

  it('falls back to the closest defined lower breakpoint', () => {
    setViewport(1400); // xl, but only 'sm' defined
    const { result } = renderHook(() =>
      useBreakpointValue({ base: 1, sm: 2 }),
    );
    expect(result.current).toBe(2);
  });

  it('falls back to base when nothing else matches', () => {
    setViewport(500); // base
    const { result } = renderHook(() =>
      useBreakpointValue({ base: 'mobile', md: 'desktop' }),
    );
    expect(result.current).toBe('mobile');
  });
});
