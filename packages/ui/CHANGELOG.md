# @yavuzmercan/ui

## 0.2.0

### Minor Changes

- b832118: yeni özellik
- b832118: Add comprehensive hook library (55 hooks across state, storage, lifecycle, async, DOM, browser APIs)
- b832118: versiyon update

### Patch Changes

- Fix: published package now correctly resolves to `./dist/*` files.

  `0.1.0` shipped with `main`/`exports` pointing at source TS paths (`./src/index.ts`) because npm does not apply `publishConfig.main`/`exports` overrides at publish time. Consumers got "Failed to resolve import '@yavuzmercan/ui'" when installing.

  Fix moves `main`, `module`, `types`, and `exports` to top-level pointing at the built `./dist/*` outputs, and reduces `publishConfig` to just `access: public`. A `prepare` script now builds the package on `npm install` so workspace consumers and post-clone setups always have a populated `dist/` directory.

  Also pins build/test toolchain versions (TypeScript 5.5.4, Vite 5.4.1, Vitest 2.1.1, jsdom 25, `@vitejs/plugin-react` 4.3.1) to known-working real versions, fixes GitHub Action versions to `@v4`, and adds `vite-env.d.ts` to apps so CSS side-effect imports type-check on TypeScript 5.6+.

- aa8353d: versiyon değişikliği
- f3dabbb: Republish with built dist files and corrected dependencies

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
