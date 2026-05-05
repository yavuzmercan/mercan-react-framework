# @yavuzmercan/ui

Theme-aware, i18n-ready React UI framework for the web. **One install — everything included.**

[![npm version](https://img.shields.io/npm/v/@yavuzmercan/ui.svg?style=flat-square)](https://www.npmjs.com/package/@yavuzmercan/ui)
[![license](https://img.shields.io/npm/l/@yavuzmercan/ui.svg?style=flat-square)](./LICENSE)

- **70+ components** — layout, forms, feedback, navigation, data display
- **88+ icons** — tree-shakeable SVG, inherit `currentColor`
- **55+ hooks** — state, storage, async, DOM, browser APIs, lifecycle
- **Theme** — design tokens as CSS variables, single brand color → full palette, light/dark
- **i18n** — interpolation, pluralization, locale switching, no extra dependency
- **Google Fonts** — `googleFonts={{ body: 'Inter' }}` and you're done
- **Accessible** — focus traps, ARIA, keyboard nav (arrow keys in Tabs/Menu)
- **Zero runtime dependencies** — only React as peer

## Install

```bash
npm install @yavuzmercan/ui
```

```bash
pnpm add @yavuzmercan/ui
# or
yarn add @yavuzmercan/ui
```

## Quick start

```tsx
import '@yavuzmercan/ui/styles.css';
import {
  MercanProvider,
  Button,
  Card,
  CardBody,
  Heart,
  useToast,
} from '@yavuzmercan/ui';

const resources = {
  en: { greet: 'Hello, {name}!' },
  tr: { greet: 'Merhaba, {name}!' },
};

export const App = () => (
  <MercanProvider
    locale="en"
    fallbackLocale="en"
    resources={resources}
    brand={{ primary: '#ff5a5f' }}
    googleFonts={{ body: 'Inter', heading: 'Sora' }}
  >
    <Demo />
  </MercanProvider>
);

const Demo = () => {
  const toast = useToast();
  return (
    <Card shadow>
      <CardBody>
        <Button
          leftIcon={<Heart size={16} />}
          onClick={() => toast.show({ title: 'Saved', status: 'success' })}
        >
          Save
        </Button>
      </CardBody>
    </Card>
  );
};
```

> **Don't forget the stylesheet.** Import `@yavuzmercan/ui/styles.css` once at your app root.

## Subpath imports

Three import paths are exposed. Use whichever feels cleanest for your file:

```tsx
// Everything (recommended for most files)
import { MercanProvider, Button, Heart, useTheme, useDebounce } from '@yavuzmercan/ui';

// Only icons (smaller surface, clearer intent)
import { Heart, Settings, Search } from '@yavuzmercan/ui/icons';

// Only components (no icons, no hooks)
import { Button, Modal, Card } from '@yavuzmercan/ui/components';
```

Modern bundlers (Vite, webpack 5+, Rollup) tree-shake either way — pick whichever reads best.

## Theming in 3 layers

### 1. Brand colors (easiest)

Pass one or two colors. Hover, active, and contrast variants are derived automatically using HSL math.

```tsx
<MercanProvider
  brand={{ primary: '#ff5a5f', secondary: '#2d3142' }}
  darkBrand={{ primary: '#ff8a8d' }}
  ...
/>
```

### 2. Token override

Deep control over any subset of tokens.

```tsx
<MercanProvider
  lightOverride={{
    colors: { background: '#fffaf0', text: '#1a1a2e' },
    radii: { md: '14px', lg: '20px' },
    fonts: { heading: '"Plus Jakarta Sans", sans-serif' },
  }}
  darkOverride={{ colors: { background: '#000', surface: '#0a0a0a' } }}
  ...
/>
```

### 3. CSS variables

Skip the JS API and override `--mf-*` directly:

```css
:root {
  --mf-color-primary: #ff5a5f;
  --mf-radius-md: 12px;
  --mf-spacing-lg: 20px;
}
```

## i18n

i18n is bundled into `MercanProvider` — no extra dependency.

```tsx
const { t, locale, setLocale, formatNumber, formatDate } = useTranslation();

t('greet', { name: 'Ada' });          // "Hello, Ada!"
t('items', { count: 5 });             // pluralization: "1 item|{count} items"
t('nav.home');                        // nested keys via dot notation
formatNumber(1234.5, { style: 'currency', currency: 'USD' });
formatDate(Date.now(), { dateStyle: 'medium' });
```

## Google Fonts

```tsx
<MercanProvider
  googleFonts={{
    body: 'Inter',
    heading: { family: 'Sora', weights: [600, 700, 800] },
    mono: 'JetBrains Mono',
  }}
  ...
/>
```

The provider injects `<link rel="preconnect">` and the stylesheet automatically and updates `theme.fonts.*` to use the loaded family.

## What's exported

### Layout (12)
`Box` · `Stack`/`HStack`/`VStack` · `Grid` · `SimpleGrid` · `AspectRatio` · `Center` · `Divider` · `Spacer` · `Container` · `AppShell` · `NavBar` · `Footer`

### Typography (3)
`Text` · `Heading` · `Label`

### Forms (22)
`Button` · `IconButton` · `Input` · `InputGroup` · `PasswordInput` · `NumberInput` · `PinInput` · `TextArea` · `Checkbox` · `Radio` / `RadioGroup` · `Switch` · `ToggleGroup` · `Rating` · `Select` · `Combobox` · `MultiSelect` · `Slider` · `Calendar` · `DatePicker` · `FileInput` · `FormField` · `FormGroup`

### Data display (22)
`Avatar` · `AvatarGroup` · `Badge` · `Tag` · `Card` · `Stat` · `Kbd` · `Code` · `CodeBlock` · `CopyButton` · `Highlight` · `DescriptionList` · `Progress` · `Spinner` · `Skeleton` · `EmptyState` · `Stepper` · `Timeline` · `List` · `Table` · `Image` · `Icon`

### Feedback (9)
`Alert` · `Banner` · `ToastProvider` (`useToast`) · `Modal` · `ConfirmDialog` · `Tooltip` · `Popover` · `HoverCard` · `LoadingOverlay`

### Navigation (10)
`Tabs` · `Link` · `Breadcrumb` · `Pagination` · `Menu` · `Drawer` · `Accordion` · `CommandPalette` · `BackToTop` · `Splitter`

### Hooks (55)

**State (11):** `useDisclosure` · `useToggle` · `useBoolean` · `useCounter` · `useArray` · `useMap` · `useSet` · `useStateHistory` (undo/redo) · `useStep` · `useControlled` · `usePrevious`

**Storage (3):** `useLocalStorage` · `useSessionStorage` · `useCookie`

**Lifecycle (6):** `useUpdateEffect` · `useMount` · `useUnmount` · `useIsMounted` · `useLatest` · `useUpdate`

**Async / time (10):** `useDebounce` · `useDebouncedCallback` · `useThrottle` · `useThrottledCallback` · `useTimeout` · `useInterval` · `useAsync` · `useFetch` · `useCountdown` · `useNow`

**DOM (14):** `useEventListener` · `useWindowSize` · `useElementSize` · `useIntersectionObserver` · `useScrollPosition` · `useScrollLock` · `useDocumentTitle` · `useHover` · `useFocusWithin` · `useHotkey` (`mod+k` / `ctrl+shift+p` combos) · `useScrollIntoView` · `useClickOutside` · `useEscape` · `useFocusTrap`

**Browser APIs (12):** `useMediaQuery` · `usePrefersDark` · `usePrefersReducedMotion` · `useOnline` · `useGeolocation` · `usePermission` · `usePageVisibility` · `useIdle` · `useFullscreen` · `useShare` · `useClipboard` · `useScript`

### Utils
`createBrandPalette` · `lighten` / `darken` / `contrastColor` · `loadGoogleFonts` · `fontStack` · `cx` · `useTheme` · `useColorMode` · `useTranslation`

### Icons (88)
`Search` · `Heart` · `Star` · `Settings` · `User` · `Bell` · `Mail` · `Plus` · `X` · `Check` · `Edit` · `Trash` · `Download` · `Copy` · `Sun` · `Moon` · `ArrowUp/Down/Left/Right` · `ChevronUp/Down/Left/Right` · `MenuIcon` · `Home` · `Github` · `MapPin` · `Globe` · `Play` · `Pause` · `Volume2` · `Camera` · `Mic` · `MessageCircle` · `ShoppingCart` · `CreditCard` · `Database` · `Server` · `Cloud` · `Lightbulb` · `ThumbsUp` · `ThumbsDown` · `Smile` · `Award` · `Briefcase` · `Building` · `Activity` · `ShieldCheck` · `Truck` · `Package` · `Gift` · `Compass` · `Layers` · `Hash` · `Zap` · `Bookmark` · `Flag` · `Save` · `Pin` · `Share` · `Send` · `LogIn` · `LogOut` · `Power` · `HelpCircle` · `Maximize` · `Minimize` · `Filter` · `Sliders` · `Sidebar` · `LayoutGrid` · `LayoutList` · ... and more.

> **Naming note:** `Calendar` and `Code` exist as both components and icons. The icon versions are exported as `CalendarIcon` and `CodeIcon`.

## Hook examples

```tsx
import {
  useDebounce,
  useLocalStorage,
  useHotkey,
  useClipboard,
  useFetch,
  useToggle,
} from '@yavuzmercan/ui';

const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 300);

const [theme, setTheme] = useLocalStorage('theme', 'light');

useHotkey('mod+k', () => openSearch());

const { copy, copied } = useClipboard();

const { data, loading, error, refetch } = useFetch<User[]>('/api/users');

const [isOpen, toggle] = useToggle();
```

## Accessibility

- `Modal` and `Drawer` ship with focus trap + return-focus
- `Tabs` and `Menu` support arrow-key navigation
- All interactive components have visible focus rings (`mf-focus-ring`)
- Components forward `aria-*` props through

## Browser support

ES2020+ (Chrome 91+, Edge 91+, Firefox 90+, Safari 15+). Uses native `IntersectionObserver`, `ResizeObserver`, `clipboard.writeText`, `Permissions API` — all hooks degrade gracefully where APIs are unavailable.

## License

MIT © Yavuz Mercan

## Links

- 🌐 [GitHub repository](https://github.com/yavuzmercan/mercan-react-framework)
- 🐛 [Report an issue](https://github.com/yavuzmercan/mercan-react-framework/issues)
- 📦 [npm package](https://www.npmjs.com/package/@yavuzmercan/ui)
