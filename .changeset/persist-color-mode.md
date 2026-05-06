---
"@yavuzmercan/ui": minor
---

feat: color mode is now persisted to localStorage by default

Toggling between light and dark mode survives page reloads — no more flicker back to default on every visit. Two new `MercanProvider` props control the behavior:

- `persistColorMode` (default `true`) — opt-out flag
- `colorModeStorageKey` (default `'mf-color-mode'`) — custom storage key for multi-app origins

Storage syncs across browser tabs via the `storage` event, and invalid stored values fall back to `defaultColorMode` cleanly. SSR-safe: server renders use `defaultColorMode` (no localStorage access), and the client hydrates from storage on mount.

```tsx
// Default — persists automatically
<MercanProvider defaultColorMode="light" ... />

// Custom key
<MercanProvider colorModeStorageKey="my-app-theme" ... />

// Opt out
<MercanProvider persistColorMode={false} ... />
```
