# @yavuzmercan/ui

Theme-aware, i18n-ready React UI framework for the web. **One install — everything included.**

- **70+ components** — layout, forms, feedback, navigation, data display
- **88+ icons** — tree-shakeable SVG, inherit `currentColor`
- **Theme** — design tokens as CSS variables, single brand color → full palette, light/dark
- **i18n** — interpolation, pluralization, locale switching, no extra dependency
- **Google Fonts** — `googleFonts={{ body: 'Inter' }}` and you're done
- **Accessible** — focus traps, ARIA, keyboard nav (arrow keys in Tabs/Menu)

## Install

```bash
npm install @yavuzmercan/ui
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

## Theming in 3 layers

1. **Brand colors** (easiest):
   ```tsx
   <MercanProvider brand={{ primary: '#ff5a5f', secondary: '#2d3142' }} ... />
   ```
   `primaryHover`, `primaryActive`, `primaryContrast` derived automatically.

2. **Token override:**
   ```tsx
   <MercanProvider lightOverride={{ radii: { md: '12px' } }} ... />
   ```

3. **CSS variables** in your own stylesheet:
   ```css
   :root {
     --mf-color-primary: #ff5a5f;
     --mf-radius-md: 12px;
   }
   ```

## i18n

```tsx
const { t, locale, setLocale, formatNumber, formatDate } = useTranslation();

t('greet', { name: 'Ada' });          // "Hello, Ada!"
t('items', { count: 5 });             // pluralization: "1 item|{count} items"
t('nav.home');                        // nested keys
formatNumber(1234.5, { style: 'currency', currency: 'USD' });
```

## What's exported

### Layout
`Box` · `Stack`/`HStack`/`VStack` · `Grid` · `SimpleGrid` · `AspectRatio` · `Center` · `Divider` · `Spacer` · `Container` · `AppShell` · `NavBar` · `Footer`

### Typography
`Text` · `Heading` · `Label`

### Forms
`Button` · `IconButton` · `Input` · `InputGroup` · `PasswordInput` · `NumberInput` · `PinInput` · `TextArea` · `Checkbox` · `Radio` · `Switch` · `ToggleGroup` · `Rating` · `Select` · `Combobox` · `MultiSelect` · `Slider` · `Calendar` · `DatePicker` · `FileInput` · `FormField` · `FormGroup`

### Data display
`Avatar` · `AvatarGroup` · `Badge` · `Tag` · `Card` · `Stat` · `Kbd` · `Code` · `CodeBlock` · `CopyButton` · `Highlight` · `DescriptionList` · `Progress` · `Spinner` · `Skeleton` · `EmptyState` · `Stepper` · `Timeline` · `List` · `Table` · `Image` · `Icon`

### Feedback
`Alert` · `Banner` · `ToastProvider` (`useToast`) · `Modal` · `ConfirmDialog` · `Tooltip` · `Popover` · `HoverCard` · `LoadingOverlay`

### Navigation
`Tabs` · `Link` · `Breadcrumb` · `Pagination` · `Menu` · `Drawer` · `Accordion` · `CommandPalette` · `BackToTop` · `Splitter`

### Hooks
`useTheme` · `useColorMode` · `useTranslation` · `useToast` · `useDisclosure` · `useClickOutside` · `useEscape` · `useFocusTrap` · `useMediaQuery` · `usePrefersDark`

### Utils
`createBrandPalette` · `lighten` / `darken` / `contrastColor` · `loadGoogleFonts` · `fontStack` · `cx`

### Icons (88)
`Search` · `Heart` · `Star` · `Settings` · `User` · `Bell` · `Mail` · `Plus` · `X` · `Check` · `Edit` · `Trash` · `Download` · `Upload` · `Copy` · `Sun` · `Moon` · `ArrowUp/Down/Left/Right` · `ChevronUp/Down/Left/Right` · `MenuIcon` · `Home` · `Github` · `MapPin` · `Globe` · `Play` · `Pause` · `Volume2` · `Camera` · `Mic` · `MessageCircle` · `ShoppingCart` · `CreditCard` · ... and many more.

> **Note:** `Calendar` and `Code` exist as both components and icons. The icon versions are exported as `CalendarIcon` and `CodeIcon` to avoid name collisions.

## License

MIT
