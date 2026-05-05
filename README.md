# Mercan React Framework

A themeable, internationalized, extensible React UI component framework for the web.

## Workspace layout

```
mercanReactFramework/
├── packages/
│   ├── core/         # ThemeProvider, I18nProvider, hooks, tokens
│   └── components/   # 35+ UI components + global styles.css
└── apps/
    └── sample-web/   # Vite showcase consuming the framework
```

## Getting started

```bash
npm install
npm run dev
```

This starts the sample app at http://localhost:5173 — it imports `@yavuzmercan/components` and `@yavuzmercan/core` directly from the workspace.

## Using the framework in a project

```tsx
import '@yavuzmercan/components/styles.css';
import { MercanProvider, Button, Card, CardBody, useToast } from '@yavuzmercan/components';
import { useTranslation, useColorMode } from '@yavuzmercan/core';

const resources = {
  en: { greet: 'Hello, {name}!' },
  tr: { greet: 'Merhaba, {name}!' },
};

export const App = () => (
  <MercanProvider
    defaultColorMode="light"
    locale="en"
    fallbackLocale="en"
    resources={resources}
    lightOverride={{ colors: { primary: '#ff5a5f' } }}
  >
    <Demo />
  </MercanProvider>
);

const Demo = () => {
  const { t } = useTranslation();
  const { toggleColorMode } = useColorMode();
  const toast = useToast();
  return (
    <Card shadow>
      <CardBody>
        <p>{t('greet', { name: 'Ada' })}</p>
        <Button onClick={toggleColorMode}>Toggle theme</Button>
        <Button onClick={() => toast.show({ title: 'Saved', status: 'success' })}>
          Toast
        </Button>
      </CardBody>
    </Card>
  );
};
```

## Theming

Theme tokens are exposed as CSS custom properties (`--mf-color-primary`, `--mf-spacing-lg`, …). The `ThemeProvider` writes them to `document.documentElement`, so you can override them globally.

Override at the provider:

```tsx
<MercanProvider
  lightOverride={{
    colors: { primary: '#ff5a5f', primaryHover: '#e74c52' },
    radii: { md: '12px' },
  }}
  darkOverride={{ colors: { background: '#000' } }}
  ...
/>
```

Or override directly with CSS:

```css
:root {
  --mf-color-primary: #ff5a5f;
  --mf-radius-md: 12px;
}
```

## i18n

`I18nProvider` is bundled inside `MercanProvider`. Use `useTranslation()`:

```tsx
const { t, locale, setLocale, formatNumber, formatDate } = useTranslation();
t('items', { count: 3 }); // pluralization: "1 item|{count} items"
```

## Component list

### Layout
`Box` · `Stack` · `HStack` · `VStack` · `Grid` · `Divider` · `Spacer` · `Container`

### Typography
`Text` · `Heading` · `Label`

### Forms
`Button` · `IconButton` · `Input` · `TextArea` · `Checkbox` · `Radio` / `RadioGroup` · `Switch` · `Select` · `Slider` · `FormField` · `FormGroup`

### Data display
`Avatar` · `Badge` · `Tag` · `Card` (`CardHeader`, `CardBody`, `CardFooter`) · `Image` · `Icon` · `Progress` · `Spinner` · `Skeleton` · `List` / `ListItem`

### Feedback
`Alert` · `Toast` (`ToastProvider`, `useToast`) · `Modal` · `Tooltip` · `Popover`

### Navigation
`Tabs` (`TabList`, `Tab`, `TabPanel`) · `Breadcrumb` · `Pagination` · `Menu` (`MenuItem`, `MenuDivider`) · `Drawer` · `Accordion` (`AccordionItem`)

### Hooks
`useTheme` · `useColorMode` · `useTranslation` · `useToast` · `useDisclosure` · `useClickOutside` · `useMediaQuery` · `useEscape`

## Extending

- All components accept `className` and `style` for ad-hoc tweaks.
- Polymorphism: `Box` and `Text` accept an `as` prop.
- Variants: `Button` (`solid` / `outline` / `ghost` / `link`), `colorScheme`, `size`.
- Compose your own primitives on top of `Box` + `useTheme` + the `v.color()` / `v.space()` helpers from `@yavuzmercan/core`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the sample app |
| `npm run build` | Build all workspaces |
| `npm run typecheck` | TypeScript project references build |
