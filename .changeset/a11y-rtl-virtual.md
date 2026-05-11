---
"@yavuzmercan/ui": minor
---

feat: hardened a11y, RTL support, and DataGrid virtualization

### Accessibility — verified, not promised

50 new axe-core assertions across every form, display, feedback, and navigation primitive. Caught and fixed three real bugs:

- **`<Progress>`** now ships an accessible name (`aria-label` defaults to `'Progress'` when neither `aria-label` nor `aria-labelledby` is supplied) — required by the [`aria-progressbar-name`](https://dequeuniversity.com/rules/axe/4.11/aria-progressbar-name) rule.
- **`<Calendar>`** no longer claims `role="grid"` without the required descendant structure. It now exposes `role="group"` with an `aria-label` derived from the current month, plus `aria-live="polite"` on the month title so screen readers announce navigation.
- **`<MultiSelect>`**'s internal input was unlabeled. The component now accepts `id`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-invalid` and forwards them onto the inner `<input>`. The input also gets `role="combobox"` + `aria-expanded` + `aria-haspopup="listbox"` for proper screen reader semantics.

axe-core runs against 39 components in CI; every PR fails if a regression sneaks in.

### RTL support

```tsx
<MercanProvider direction="rtl" locale="ar" ...>
  {children}
</MercanProvider>
```

- New `direction?: 'ltr' | 'rtl'` prop on `<MercanProvider>` — sets `dir` on `<html>` and `data-mf-dir` on the root, and restores the previous value when the provider unmounts.
- 13 physical CSS properties converted to logical equivalents (`margin-inline-start`, `padding-inline-end`, `inset-inline-end`, `border-start-end-radius`, …) so `Switch`, `Toast`, `NumberInput`, `InputGroup`, `PasswordInput`, `AvatarGroup`, `NavBar`, `AppShell`, `CommandPalette`, `DataGrid`'s select cell, and `Label`'s required-asterisk all mirror correctly.
- `<Select>`'s caret moves to the start side under RTL; `<Switch>`'s thumb travels the opposite direction.

### Virtual scroll for DataGrid

For tables with 1000+ rows. Drops the painted-row count from O(n) to O(viewport / rowHeight + overscan).

```tsx
<DataGrid<User>
  data={tenThousandUsers}
  columns={cols}
  rowKey={(u) => u.id}
  virtualize
  rowHeight={48}      // estimated row height in px
  maxHeight={480}     // scroll container height
  overscan={8}        // rows rendered just off-screen
/>
```

Powered by `@tanstack/react-virtual`. Mutually exclusive with `pagination` — virtualization wins.
