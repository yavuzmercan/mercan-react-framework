---
"@yavuzmercan/ui": minor
---

feat: mobile-responsive layout components and `useBreakpoint` hooks

Mobile devices now get sensible default layouts without any opt-in. CSS media queries (`≤768px`) collapse layout components to single-column or full-width:

- **AppShell** — sidebar hidden, main becomes full-width
- **NavBar** — compact padding; nav links hidden by default (apps should provide a hamburger trigger)
- **Container** — tighter horizontal padding
- **Modal** — fullscreen-feel with bottom-sheet alignment
- **Drawer** — wider (`min(85vw, 360px)` left/right; `min(80vh, 420px)` top/bottom)
- **Toast** — full-width with edge insets
- **CommandPalette** — fullscreen on mobile
- **DataGrid** — smaller font, tighter cells, stacked footer
- **Tabs** — horizontal scroll for many tabs
- **Stepper, Footer** — stacked / overflow handling
- **CodeBlock, Menu, HoverCard** — readable / fits viewport

A tablet rule (`768–1023px`) narrows the AppShell sidebar to 200px.

### New: breakpoint tokens

`theme.breakpoints` is now a first-class token, exposed as CSS variables (`--mf-bp-sm`, `--mf-bp-md`, etc.) and TypeScript-typed:

```ts
sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px'
```

### New: 4 breakpoint hooks

- `useBreakpoint()` → returns active breakpoint name (`'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`)
- `useBreakpointUp('md')` → boolean, true at/above 768px (≥)
- `useBreakpointDown('md')` → boolean, true below 768px (<)
- `useBreakpointValue({ base: 1, md: 2, lg: 4 })` → picks the value matching the active breakpoint (with sensible fallback to lower breakpoints)

```tsx
const isMobile = useBreakpointDown('md');
const columns = useBreakpointValue({ base: 1, md: 2, lg: 4 });
return <SimpleGrid columns={columns}>{...}</SimpleGrid>;
```

All hooks accept a custom breakpoints object as a second argument if you've overridden `theme.breakpoints`.

### Docs site mobile-friendly

The documentation site itself now adapts on mobile — sidebar collapses into a slide-in drawer behind a hamburger button, and the theme customizer wraps cleanly.
