import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MercanProvider } from '../MercanProvider';
import { Button } from '../forms/Button';
import { Input } from '../forms/Input';
import { Text } from '../typography/Text';

const Wrap = ({ direction, children }: { direction?: 'ltr' | 'rtl'; children: React.ReactNode }) => (
  <MercanProvider direction={direction} locale="en" fallbackLocale="en" resources={{ en: {} }}>
    {children}
  </MercanProvider>
);

describe('RTL support', () => {
  afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute('dir');
  });

  it('defaults to ltr on <html>', () => {
    render(<Wrap><Text>hello</Text></Wrap>);
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  it('sets dir="rtl" on <html> when direction="rtl"', () => {
    render(<Wrap direction="rtl"><Text>سلام</Text></Wrap>);
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });

  it('mf-root carries data-mf-dir attribute', () => {
    const { container } = render(<Wrap direction="rtl"><Button>OK</Button></Wrap>);
    const root = container.querySelector('.mf-root');
    expect(root?.getAttribute('data-mf-dir')).toBe('rtl');
  });

  it('switching direction updates dir on <html>', () => {
    const { rerender } = render(<Wrap direction="ltr"><Text>hi</Text></Wrap>);
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
    rerender(<Wrap direction="rtl"><Text>سلام</Text></Wrap>);
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });

  it('cleanup restores previous <html> dir attribute', () => {
    document.documentElement.setAttribute('dir', 'ltr');
    const { unmount } = render(<Wrap direction="rtl"><Text>x</Text></Wrap>);
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    unmount();
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  it('controls inside RTL provider inherit dir context', () => {
    const { container } = render(
      <Wrap direction="rtl">
        <Input placeholder="ابحث…" />
      </Wrap>,
    );
    // The input is inside an element tree whose root has data-mf-dir="rtl".
    const root = container.querySelector('.mf-root');
    expect(root?.getAttribute('data-mf-dir')).toBe('rtl');
    expect(root?.contains(container.querySelector('input'))).toBe(true);
  });
});
