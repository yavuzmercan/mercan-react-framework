export interface GoogleFontConfig {
  family: string;
  weights?: number[];
  italic?: boolean;
  display?: 'swap' | 'block' | 'fallback' | 'optional' | 'auto';
}

const DEFAULT_WEIGHTS = [400, 500, 600, 700];

export const buildGoogleFontUrl = (fonts: GoogleFontConfig[]): string => {
  if (fonts.length === 0) return '';
  const families = fonts.map((f) => {
    const weights = f.weights ?? DEFAULT_WEIGHTS;
    if (f.italic) {
      const items = weights
        .flatMap((w) => [`0,${w}`, `1,${w}`])
        .join(';');
      return `family=${encodeURIComponent(f.family)}:ital,wght@${items}`;
    }
    return `family=${encodeURIComponent(f.family)}:wght@${weights.join(';')}`;
  });
  const display = fonts[0]?.display ?? 'swap';
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=${display}`;
};

const PRECONNECT_FLAG = 'data-mf-gfont-preconnect';
const STYLESHEET_FLAG = 'data-mf-gfont-stylesheet';

const ensurePreconnect = () => {
  if (document.querySelector(`link[${PRECONNECT_FLAG}="api"]`)) return;
  const api = document.createElement('link');
  api.rel = 'preconnect';
  api.href = 'https://fonts.googleapis.com';
  api.setAttribute(PRECONNECT_FLAG, 'api');
  document.head.appendChild(api);

  const stat = document.createElement('link');
  stat.rel = 'preconnect';
  stat.href = 'https://fonts.gstatic.com';
  stat.crossOrigin = '';
  stat.setAttribute(PRECONNECT_FLAG, 'static');
  document.head.appendChild(stat);
};

/**
 * Inject a Google Fonts <link> for the given families.
 * Idempotent: calling multiple times with the same set is a no-op.
 * Calling with a different set replaces the previous stylesheet.
 */
export const loadGoogleFonts = (fonts: GoogleFontConfig[]): void => {
  if (typeof document === 'undefined' || fonts.length === 0) return;
  const url = buildGoogleFontUrl(fonts);
  if (!url) return;

  ensurePreconnect();

  const existing = document.querySelector<HTMLLinkElement>(`link[${STYLESHEET_FLAG}]`);
  if (existing && existing.href === url) return;

  const link = existing ?? document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.setAttribute(STYLESHEET_FLAG, '');
  if (!existing) document.head.appendChild(link);
};

/** Build a CSS font-stack string from a family name with a sensible fallback. */
export const fontStack = (family: string, fallback = 'system-ui, -apple-system, sans-serif'): string =>
  `"${family}", ${fallback}`;
