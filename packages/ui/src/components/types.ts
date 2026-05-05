import type { Theme } from '../core';

export type Size = 'sm' | 'md' | 'lg';
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type SpacingKey = keyof Theme['spacing'];
export type RadiusKey = keyof Theme['radii'];
