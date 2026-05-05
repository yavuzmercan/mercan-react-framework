export interface Tokens {
  spacing: Record<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl', string>;
  radii: Record<'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full', string>;
  fontSizes: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl', string>;
  fontWeights: Record<'regular' | 'medium' | 'semibold' | 'bold', string>;
  lineHeights: Record<'tight' | 'normal' | 'relaxed', string>;
  fonts: Record<'body' | 'heading' | 'mono', string>;
  shadows: Record<'none' | 'sm' | 'md' | 'lg' | 'xl', string>;
  zIndices: Record<'base' | 'dropdown' | 'sticky' | 'overlay' | 'modal' | 'popover' | 'toast' | 'tooltip', string>;
  durations: Record<'fast' | 'normal' | 'slow', string>;
}

export const baseTokens: Tokens = {
  spacing: {
    none: '0',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
  },
  radii: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
  },
  fonts: {
    body: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    heading: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 8px rgba(0,0,0,0.08)',
    lg: '0 10px 20px rgba(0,0,0,0.12)',
    xl: '0 20px 30px rgba(0,0,0,0.16)',
  },
  zIndices: {
    base: '0',
    dropdown: '1000',
    sticky: '1100',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    toast: '1700',
    tooltip: '1800',
  },
  durations: {
    fast: '120ms',
    normal: '200ms',
    slow: '320ms',
  },
};
