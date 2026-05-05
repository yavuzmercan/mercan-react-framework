/**
 * Lightweight color utilities for deriving hover/active/contrast colors
 * from a single brand color. Accepts hex (#rgb / #rrggbb) or rgb()/hsl() input.
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

const clamp = (n: number, min = 0, max = 255) => Math.max(min, Math.min(max, n));

const expandShortHex = (hex: string): string => {
  if (hex.length === 4) {
    return '#' + hex[1]! + hex[1]! + hex[2]! + hex[2]! + hex[3]! + hex[3]!;
  }
  return hex;
};

export const parseColor = (input: string): RGB => {
  const s = input.trim();
  if (s.startsWith('#')) {
    const hex = expandShortHex(s).slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  const m = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (m) {
    return { r: +m[1]!, g: +m[2]!, b: +m[3]! };
  }
  return { r: 0, g: 0, b: 0 };
};

const toHex = (n: number) => clamp(Math.round(n)).toString(16).padStart(2, '0');

export const rgbToHex = ({ r, g, b }: RGB) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

const rgbToHsl = ({ r, g, b }: RGB) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
};

const hue2rgb = (p: number, q: number, t: number) => {
  let tt = t;
  if (tt < 0) tt += 1;
  if (tt > 1) tt -= 1;
  if (tt < 1 / 6) return p + (q - p) * 6 * tt;
  if (tt < 1 / 2) return q;
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
  return p;
};

const hslToRgb = ({ h, s, l }: { h: number; s: number; l: number }): RGB => {
  if (s === 0) return { r: l * 255, g: l * 255, b: l * 255 };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: hue2rgb(p, q, h + 1 / 3) * 255,
    g: hue2rgb(p, q, h - 1 / 3) * 255,
    b: hue2rgb(p, q, h + 1 / 6 - 0.5) * 255,
  };
};

const adjustLightness = (hex: string, delta: number): string => {
  const { h, s, l } = rgbToHsl(parseColor(hex));
  return rgbToHex(hslToRgb({ h, s, l: Math.max(0, Math.min(1, l + delta)) }));
};

export const lighten = (hex: string, amount = 0.08) => adjustLightness(hex, amount);
export const darken = (hex: string, amount = 0.08) => adjustLightness(hex, -amount);

/** Pick a readable foreground (white/black) based on the input color's luminance. */
export const contrastColor = (hex: string, light = '#ffffff', dark = '#0b0d12'): string => {
  const { r, g, b } = parseColor(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? dark : light;
};

export interface BrandPalette {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryContrast: string;
  secondary?: string;
  secondaryHover?: string;
  secondaryContrast?: string;
}

export interface CreateBrandPaletteOptions {
  primary: string;
  secondary?: string;
  /** 'light' shifts hover/active darker; 'dark' shifts them lighter. Default: 'light'. */
  mode?: 'light' | 'dark';
}

export const createBrandPalette = ({
  primary,
  secondary,
  mode = 'light',
}: CreateBrandPaletteOptions): BrandPalette => {
  const dir = mode === 'dark' ? 1 : -1;
  const palette: BrandPalette = {
    primary,
    primaryHover: adjustLightness(primary, 0.08 * dir),
    primaryActive: adjustLightness(primary, 0.16 * dir),
    primaryContrast: contrastColor(primary),
  };
  if (secondary) {
    palette.secondary = secondary;
    palette.secondaryHover = adjustLightness(secondary, 0.08 * dir);
    palette.secondaryContrast = contrastColor(secondary);
  }
  return palette;
};
