import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { useResponsiveValue } from '../../core';
import { Col, Grid, Row, Stack } from '../layout';

const setViewport = (width: number) => {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: width });
  window.dispatchEvent(new Event('resize'));
};

describe('useResponsiveValue', () => {
  const originalWidth = window.innerWidth;
  beforeEach(() => setViewport(1280));
  afterEach(() => setViewport(originalWidth));

  it('passes through plain values unchanged', () => {
    const { result } = renderHook(() => useResponsiveValue(42));
    expect(result.current).toBe(42);
  });

  it('returns matching breakpoint value', () => {
    setViewport(900); // md
    const { result } = renderHook(() => useResponsiveValue({ base: 1, md: 2, lg: 4 }));
    expect(result.current).toBe(2);
  });

  it('falls back to lower breakpoints', () => {
    setViewport(1500); // xl
    const { result } = renderHook(() => useResponsiveValue({ base: 1, md: 2 }));
    expect(result.current).toBe(2);
  });

  it('handles undefined input', () => {
    const { result } = renderHook(() => useResponsiveValue(undefined));
    expect(result.current).toBeUndefined();
  });

  it('treats arrays as plain values (only objects with bp keys are responsive)', () => {
    const { result } = renderHook(() => useResponsiveValue<number[]>([1, 2, 3]));
    expect(result.current).toEqual([1, 2, 3]);
  });
});

describe('Grid responsive columns', () => {
  beforeEach(() => setViewport(1280));

  it('renders gridTemplateColumns based on responsive object at md', () => {
    setViewport(900); // md
    const { container } = render(
      <Grid columns={{ base: 1, md: 2, lg: 4 }}>
        <div>a</div><div>b</div>
      </Grid>,
    );
    const div = container.querySelector('.mf-grid') as HTMLElement;
    expect(div.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
  });

  it('uses base value below sm', () => {
    setViewport(500);
    const { container } = render(
      <Grid columns={{ base: 1, md: 2, lg: 4 }}>
        <div>a</div>
      </Grid>,
    );
    const div = container.querySelector('.mf-grid') as HTMLElement;
    expect(div.style.gridTemplateColumns).toBe('repeat(1, minmax(0, 1fr))');
  });
});

describe('Stack responsive direction', () => {
  it('flips direction on breakpoint', () => {
    setViewport(500);
    const { container, rerender } = render(
      <Stack direction={{ base: 'column', md: 'row' }} gap="md">
        <div>a</div>
      </Stack>,
    );
    expect(container.querySelector('.mf-stack')!.getAttribute('data-direction')).toBe('column');

    setViewport(900);
    rerender(
      <Stack direction={{ base: 'column', md: 'row' }} gap="md">
        <div>a</div>
      </Stack>,
    );
    expect(container.querySelector('.mf-stack')!.getAttribute('data-direction')).toBe('row');
  });
});

describe('Row + Col 12-grid', () => {
  it('Col span={6} renders 50% width', () => {
    const { container } = render(
      <Row>
        <Col span={6} data-testid="c1">a</Col>
        <Col span={6} data-testid="c2">b</Col>
      </Row>,
    );
    const c1 = container.querySelector('[data-testid="c1"]') as HTMLElement;
    expect(c1.style.flexBasis).toBe('50%');
    expect(c1.style.maxWidth).toBe('50%');
  });

  it('Col span="auto" uses intrinsic width', () => {
    const { container } = render(
      <Row>
        <Col span="auto">a</Col>
      </Row>,
    );
    const c = container.querySelector('.mf-col') as HTMLElement;
    expect(c.style.flexBasis).toBe('auto');
  });

  it('Col span="fill" grows to fill remaining space', () => {
    const { container } = render(
      <Row>
        <Col span="fill">a</Col>
      </Row>,
    );
    const c = container.querySelector('.mf-col') as HTMLElement;
    expect(c.style.flexGrow).toBe('1');
  });

  it('breakpoint override applies at correct width', () => {
    setViewport(500); // base
    const { container, rerender } = render(
      <Row>
        <Col span={12} md={6}>a</Col>
      </Row>,
    );
    let c = container.querySelector('.mf-col') as HTMLElement;
    expect(c.style.flexBasis).toBe('100%'); // 12/12

    setViewport(900); // md
    rerender(
      <Row>
        <Col span={12} md={6}>a</Col>
      </Row>,
    );
    c = container.querySelector('.mf-col') as HTMLElement;
    expect(c.style.flexBasis).toBe('50%'); // 6/12
  });

  it('offset adds left margin', () => {
    const { container } = render(
      <Row>
        <Col span={6} offset={3}>a</Col>
      </Row>,
    );
    const c = container.querySelector('.mf-col') as HTMLElement;
    expect(c.style.marginLeft).toBe('25%'); // 3/12
  });
});
