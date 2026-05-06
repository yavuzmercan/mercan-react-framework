import { createPresetColors } from './createPreset';
import type { ThemePreset } from './types';

// Tailwind — modern web standard with slate + blue
export const tailwind: ThemePreset = {
  name: 'Tailwind',
  description: 'Tailwind CSS-inspired — slate neutrals with blue primary.',
  light: {
    colors: createPresetColors({
      mode: 'light',
      background: '#ffffff',
      surface: '#ffffff',
      surfaceAlt: '#f8fafc',  // slate-50
      border: '#e2e8f0',      // slate-200
      borderSubtle: '#f1f5f9', // slate-100
      text: '#0f172a',         // slate-900
      textMuted: '#64748b',    // slate-500
      primary: '#2563eb',      // blue-600
      secondary: '#475569',    // slate-600
      success: '#16a34a',      // green-600
      warning: '#d97706',      // amber-600
      danger: '#dc2626',       // red-600
      info: '#0891b2',         // cyan-600
    }),
  },
  dark: {
    colors: createPresetColors({
      mode: 'dark',
      background: '#020617',   // slate-950
      surface: '#0f172a',      // slate-900
      surfaceAlt: '#1e293b',   // slate-800
      border: '#334155',       // slate-700
      borderSubtle: '#1e293b', // slate-800
      text: '#f1f5f9',         // slate-100
      textMuted: '#94a3b8',    // slate-400
      primary: '#3b82f6',      // blue-500
      secondary: '#94a3b8',    // slate-400
      success: '#22c55e',      // green-500
      warning: '#f59e0b',      // amber-500
      danger: '#ef4444',       // red-500
      info: '#06b6d4',         // cyan-500
    }),
  },
};
