---
"@yavuzmercan/ui": patch
---

fix: theme fonts now apply inside portal-rendered components

`Modal`, `Drawer`, `Toast`, and `CommandPalette` render directly into `document.body` via React portals, so they escaped `.mf-root`'s `font-family` inheritance — when a user set `googleFonts={{ body: 'Inter' }}` or overrode `theme.fonts.body`, the modal/drawer/toast still showed the browser default font.

Portal containers (`.mf-modal-overlay`, `.mf-drawer-overlay`, `.mf-drawer`, `.mf-toast-region`, `.mf-cmd-overlay`) now explicitly set `font-family: var(--mf-font-body)` and `color: var(--mf-color-text)`, and modal/drawer titles get `var(--mf-font-heading)`. Inline floaters (`Tooltip`, `Popover`, `Menu`, `HoverCard`) get the same body-font rule defensively.

No API change — this is purely a styling fix. Existing CSS variable overrides keep working as before.
