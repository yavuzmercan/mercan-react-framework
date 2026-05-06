---
"@yavuzmercan/ui": minor
---

feat: 8 built-in theme presets

One prop, full theme. Each preset ships with both light and dark color sets:

- `solarized` — Ethan Schoonover's classic
- `nord` — Arctic-inspired, blue-gray
- `dracula` — Vibrant pink/purple dark theme
- `github` — Familiar light + dark
- `monokai` — Editor classic
- `material` — Material Design 3
- `tailwind` — Slate + blue, modern web standard
- `oneDark` — Atom/VS Code "One"

```tsx
// Shorthand
<MercanProvider preset="nord" locale="en" resources={{}}>
  <App />
</MercanProvider>

// Composable — mix light from one preset with dark from another
import { presets } from '@yavuzmercan/ui';
<MercanProvider
  lightOverride={presets.solarized.light}
  darkOverride={presets.dracula.dark}
  ...
/>

// Preset + brand override on top — your brand wins for primary
<MercanProvider preset="nord" brand={{ primary: '#ff5a5f' }} ... />
```

Override precedence (last wins): preset → brand → fonts → user `lightOverride`/`darkOverride`.

For custom presets, the new `createPresetColors` helper expands ~12 inputs into all 26 theme color slots — hover, active, contrast, focus-ring values are derived automatically:

```tsx
import { createPresetColors, type ThemePreset } from '@yavuzmercan/ui';

export const myBrand: ThemePreset = {
  name: 'My Brand',
  light: { colors: createPresetColors({ mode: 'light', background: '#fff', primary: '#ff5a5f', /* ... */ }) },
  dark: { /* ... */ },
};
```

Also exports `rgba(hex, alpha)` color util for convenience.
