# @yavuzmercan/ui

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
