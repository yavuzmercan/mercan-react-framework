# @yavuzmercan/ui

## 0.7.0

### Minor Changes

- bbd70a4: feat: responsive props and a 12-column `Row` / `Col` system

  Two complementary layout patterns now ship side-by-side:

  ### 1. Responsive object on existing layout components

  `Grid`, `SimpleGrid`, and `Stack` (+ `HStack`/`VStack`) accept a per-breakpoint object on their key props. No new components needed for symmetric layouts.

  ```tsx
  <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: 'sm', md: 'md' }}>
    {tiles}
  </Grid>

  <Stack direction={{ base: 'column', md: 'row' }} gap="md">
    <Sidebar /> <Main />
  </Stack>

  <SimpleGrid minChildWidth={{ base: 140, md: 200 }} gap="md">
    {cards}
  </SimpleGrid>
  ```

  ### 2. New `GridItem` for asymmetric grid layouts

  ```tsx
  <Grid columns={{ base: 1, md: 4 }} gap="md">
    <GridItem colSpan={{ base: 1, md: 4 }}>
      <Hero />
    </GridItem>
    <GridItem colSpan={{ base: 1, md: 2 }}>
      <Card />
    </GridItem>
    <GridItem colSpan={{ base: 1, md: 1 }}>
      <Card />
    </GridItem>
  </Grid>
  ```

  Accepts `colSpan` (number or `'full'`), `rowSpan`, `colStart`, `colEnd`, `rowStart`, `rowEnd` — all responsive.

  ### 3. New `Row` + `Col` — Bootstrap-style 12-grid

  For developers coming from Bootstrap, MUI Grid, Antd. Each `Col` takes a base `span` (1–12, `'auto'`, or `'fill'`) and per-breakpoint overrides:

  ```tsx
  <Row gutter="md">
    <Col span={12} md={6} lg={4}>A</Col>
    <Col span={12} md={6} lg={4}>B</Col>
    <Col span={12} md={12} lg={4}>C</Col>
  </Row>

  // Sidebar pattern with offset
  <Row gutter="md">
    <Col span={12} md={4} lg={3}><Sidebar /></Col>
    <Col span={12} md={8} lg={9}><Main /></Col>
  </Row>

  // Auto + fill — flex-style
  <Row gutter="md" align="center">
    <Col span="auto"><Avatar /></Col>
    <Col span="fill"><Title /></Col>
    <Col span="auto"><Action /></Col>
  </Row>
  ```

  `Col` also supports `offset` (left margin in 12-grid units) and `order`.

  ### 4. New: `useResponsiveValue` and `ResponsiveValue<T>` type

  For your own components:

  ```tsx
  import { useResponsiveValue, type ResponsiveValue } from "@yavuzmercan/ui";

  interface Props {
    size?: ResponsiveValue<"sm" | "md" | "lg">;
  }

  const MyComponent = ({ size }: Props) => {
    const resolved = useResponsiveValue(size); // 'sm' | 'md' | 'lg' | undefined
    return <div data-size={resolved} />;
  };
  ```

  Plain values pass through unchanged; objects are resolved against the active breakpoint with sensible fallback to lower breakpoints.

## 0.6.0

### Minor Changes

- 948ccd6: feat: mobile-responsive layout components and `useBreakpoint` hooks

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

## 0.5.0

### Minor Changes

- e59d1cc: feat: add `DataGrid` component for sortable, paginated, selectable data tables

  The existing `Table` is for simple key/value-style data. `DataGrid` is for real-world dashboard tables — everything you actually need:

  - **Sortable columns** — click header to cycle asc / desc / none
  - **Built-in pagination** — `pagination={{ pageSize: 10 }}` and you're done
  - **Row selection** — `selectable="single"` or `"multiple"` with header select-all + indeterminate state
  - **Loading skeletons** — `loading` prop renders `loadingRows` placeholder rows
  - **Empty state** — customizable `emptyState` / `emptyMessage`
  - **Density** — `compact` or `comfortable`
  - **Sticky header** — `stickyHeader` + `maxHeight` for long lists
  - **Striped + hover** — visual options
  - **Server-side mode** — `manualSort` + `manualPagination` for fetched data with controlled state

  ```tsx
  <DataGrid<User>
    data={users}
    columns={[
      {
        key: "name",
        header: "Name",
        sortable: true,
        cell: (u) => <UserCell user={u} />,
      },
      { key: "role", header: "Role", sortable: true, width: 100 },
      {
        key: "status",
        header: "Status",
        cell: (u) => <Badge>{u.status}</Badge>,
      },
    ]}
    rowKey={(u) => u.id}
    selectable="multiple"
    selected={selected}
    onSelectionChange={setSelected}
    pagination={{ pageSize: 20 }}
    defaultSort={{ key: "name", direction: "asc" }}
  />
  ```

  Fully typed generic — TypeScript infers row type from `data`. Works alongside the existing `Table` (kept for minimal cases).

- e59d1cc: feat: 8 built-in theme presets

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
  import { createPresetColors, type ThemePreset } from "@yavuzmercan/ui";

  export const myBrand: ThemePreset = {
    name: "My Brand",
    light: {
      colors: createPresetColors({
        mode: "light",
        background: "#fff",
        primary: "#ff5a5f" /* ... */,
      }),
    },
    dark: {
      /* ... */
    },
  };
  ```

  Also exports `rgba(hex, alpha)` color util for convenience.

### Patch Changes

- e59d1cc: fix: theme fonts now apply inside portal-rendered components

  `Modal`, `Drawer`, `Toast`, and `CommandPalette` render directly into `document.body` via React portals, so they escaped `.mf-root`'s `font-family` inheritance — when a user set `googleFonts={{ body: 'Inter' }}` or overrode `theme.fonts.body`, the modal/drawer/toast still showed the browser default font.

  Portal containers (`.mf-modal-overlay`, `.mf-drawer-overlay`, `.mf-drawer`, `.mf-toast-region`, `.mf-cmd-overlay`) now explicitly set `font-family: var(--mf-font-body)` and `color: var(--mf-color-text)`, and modal/drawer titles get `var(--mf-font-heading)`. Inline floaters (`Tooltip`, `Popover`, `Menu`, `HoverCard`) get the same body-font rule defensively.

  No API change — this is purely a styling fix. Existing CSS variable overrides keep working as before.

## 0.4.1

### Patch Changes

- 8eefe58: docs: add live documentation site at https://yavuzmercan.github.io/mercan-react-framework/

  The full interactive docs — live demos for every component, hook, and icon, plus a theme customizer — are now hosted on GitHub Pages and prominently linked from the README and `homepage` field. Users no longer need to read TypeScript types to learn the API; they can copy-paste from working examples.

## 0.4.0

### Minor Changes

- 6935f45: feat: color mode is now persisted to localStorage by default

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

- 6935f45: persist color mode to localStorage

## 0.3.4

### Patch Changes

- 481ad5b: Releasing Document Update

## 0.3.3

### Patch Changes

- c577697: güncelleme

## 0.3.2

### Patch Changes

- 52f4e74: uptade

## 0.3.1

### Patch Changes

- 88d3072: Test automated CI publish flow

## 0.3.0

### Minor Changes

- 665b834: provenance closed

## 0.2.2

### Patch Changes

- 75763b0: versiyon değişiklik testi

## 0.2.1

### Patch Changes

- b474e29: docs: refresh README for v0.2.0

  - Document subpath imports: `@yavuzmercan/ui/icons` and `@yavuzmercan/ui/components`
  - List all 55 hooks across 6 categories (state / storage / lifecycle / async / DOM / browser APIs)
  - Add hook usage examples (`useDebounce`, `useLocalStorage`, `useHotkey`, `useClipboard`, `useFetch`, `useToggle`)
  - Dedicated Google Fonts section with `googleFonts` prop
  - Browser support note (ES2020+, native `IntersectionObserver` / `ResizeObserver` / Permissions API)
  - npm version + license + CI status badges
  - Component category counts (`Forms (22)`, `Data display (22)`, etc.)
  - pnpm/yarn install instructions

## 0.2.0

### Minor Changes

- [`b832118`](https://github.com/yavuzmercan/mercan-react-framework/commit/b832118cbe330a430ffda418e0ec7a68cb46dbd0) Thanks [@yavuzm](https://github.com/yavuzm)! - yeni özellik

- [`b832118`](https://github.com/yavuzmercan/mercan-react-framework/commit/b832118cbe330a430ffda418e0ec7a68cb46dbd0) Thanks [@yavuzm](https://github.com/yavuzm)! - Add comprehensive hook library (55 hooks across state, storage, lifecycle, async, DOM, browser APIs)

- [`b832118`](https://github.com/yavuzmercan/mercan-react-framework/commit/b832118cbe330a430ffda418e0ec7a68cb46dbd0) Thanks [@yavuzm](https://github.com/yavuzm)! - versiyon update

### Patch Changes

- [`aa8353d`](https://github.com/yavuzmercan/mercan-react-framework/commit/aa8353d7bd1f812b4c5d22ef79475574c48fb135) Thanks [@yavuzm](https://github.com/yavuzm)! - versiyon değişikliği

- [`f3dabbb`](https://github.com/yavuzmercan/mercan-react-framework/commit/f3dabbbdce3f1f1b97c47907401c5cb9dddde775) Thanks [@yavuzm](https://github.com/yavuzm)! - Republish with built dist files and corrected dependencies

## 0.1.0

### Initial release

Single-package React UI framework: 70+ components, 88+ icons, theme/i18n/Google Fonts, accessible primitives.

- **Layout:** `Box`, `Stack`/`HStack`/`VStack`, `Grid`, `SimpleGrid`, `AspectRatio`, `Center`, `Divider`, `Spacer`, `Container`, `AppShell`, `NavBar`, `Footer`
- **Typography:** `Text`, `Heading`, `Label`
- **Forms:** `Button`, `IconButton`, `Input`, `InputGroup`, `PasswordInput`, `NumberInput`, `PinInput`, `TextArea`, `Checkbox`, `Radio`/`RadioGroup`, `Switch`, `ToggleGroup`, `Rating`, `Select`, `Combobox`, `MultiSelect`, `Slider`, `Calendar`, `DatePicker`, `FileInput`, `FormField`, `FormGroup`
- **Display:** `Avatar`, `AvatarGroup`, `Badge`, `Tag`, `Card`, `Stat`, `Kbd`, `Code`, `CodeBlock`, `CopyButton`, `Highlight`, `DescriptionList`, `Progress`, `Spinner`, `Skeleton`, `EmptyState`, `Stepper`, `Timeline`, `List`, `Table`, `Image`, `Icon`
- **Feedback:** `Alert`, `Banner`, `ToastProvider`/`useToast`, `Modal`, `ConfirmDialog`, `Tooltip`, `Popover`, `HoverCard`, `LoadingOverlay`
- **Navigation:** `Tabs`, `Link`, `Breadcrumb`, `Pagination`, `Menu`, `Drawer`, `Accordion`, `CommandPalette`, `BackToTop`, `Splitter`
- **Theme:** `MercanProvider` with `brand`/`darkBrand` (auto-derives hover/active/contrast), `lightOverride`/`darkOverride` (token override), CSS variable bridge
- **i18n:** `I18nProvider`, `useTranslation`, interpolation `{name}`, simple plural `one|other`, `formatNumber`, `formatDate`
- **Google Fonts:** `googleFonts={{ body, heading, mono }}` prop on `MercanProvider`
- **Accessibility:** Focus traps in `Modal`/`Drawer`, arrow-key nav in `Tabs`/`Menu`, focus rings, ARIA roles
- **Subpath imports:** `@yavuzmercan/ui`, `@yavuzmercan/ui/components`, `@yavuzmercan/ui/icons`
- **88 icons** including Github, ShoppingCart, Camera, MessageCircle, Globe, ThumbsUp, etc.
