import { Heading, Text, VStack, Alert, Card, CardBody, Button, HStack } from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

const BRAND_EX = `<MercanProvider
  brand={{ primary: '#ff5a5f', secondary: '#2d3142' }}
  darkBrand={{ primary: '#ff8a8d' }}
  locale="en"
  resources={{}}
>
  {children}
</MercanProvider>`;

const OVERRIDE_EX = `<MercanProvider
  lightOverride={{
    colors: { background: '#fffaf0', text: '#1a1a2e' },
    radii: { md: '14px', lg: '20px' },
  }}
  darkOverride={{
    colors: { background: '#000', surface: '#0a0a0a' },
  }}
  locale="en"
  resources={{}}
>
  {children}
</MercanProvider>`;

const CSS_EX = `:root {
  --mf-color-primary: #ff5a5f;
  --mf-radius-md: 12px;
}`;

const HOOK_EX = `import { useTheme, useColorMode } from '@yavuzmercan/ui';

const { theme } = useTheme(); // typed token object
const { colorMode, toggleColorMode } = useColorMode();`;

export const ThemingPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Theming</Heading>
    <Text>
      Mercan exposes every visual decision as a token, surfaced both as a TypeScript object
      and as a CSS custom property. There are three ways to customize, from the easiest to the most thorough:
    </Text>

    <Heading level={3}>1. Brand colors (recommended)</Heading>
    <Text>
      Pass a single primary (and optionally secondary) color. Mercan derives the right
      hover, active, and contrast variants automatically using HSL math.
    </Text>
    <Story title="brand prop" code={BRAND_EX}>
      <Card><CardBody>
        <HStack gap="sm">
          <Button>Brand primary</Button>
          <Button variant="outline">Brand outline</Button>
        </HStack>
      </CardBody></Card>
    </Story>

    <Heading level={3}>2. Token override</Heading>
    <Text>
      For deep control, pass <code>lightOverride</code> / <code>darkOverride</code>. Any subset of
      tokens you provide is merged into the default theme.
    </Text>
    <Story title="token override" code={OVERRIDE_EX}>
      <Alert status="info">All tokens — colors, spacing, radii, shadows, fonts — are overridable.</Alert>
    </Story>

    <Heading level={3}>3. CSS variables</Heading>
    <Text>If you'd rather skip the JS API entirely, override the CSS custom properties directly:</Text>
    <Story title="CSS override" code={CSS_EX}>
      <Text tone="muted" size="sm">All tokens are namespaced under <code>--mf-*</code>.</Text>
    </Story>

    <Heading level={3}>Reading the theme in code</Heading>
    <Story title="useTheme / useColorMode" code={HOOK_EX}>
      <Text tone="muted" size="sm">Both hooks are typed and re-render on theme changes.</Text>
    </Story>

    <Heading level={3}>Persistence — color mode survives reload</Heading>
    <Text>
      The chosen color mode is saved to <code>localStorage</code> by default. When the user
      reloads the page, the same theme returns instead of flickering back to the default.
      Storage syncs across browser tabs too.
    </Text>
    <Story title="Default behavior — automatic persistence" code={`<MercanProvider defaultColorMode="light" ... />\n// First visit:        light\n// User toggles dark, reloads.\n// Second visit:       dark   ← persisted`}>
      <Text size="sm" tone="muted">
        Toggle the theme in the customizer above, refresh the page, and watch this docs site
        keep your preference. Storage key: <code>mf-color-mode</code>.
      </Text>
    </Story>
    <Story title="Custom storage key" code={`<MercanProvider colorModeStorageKey="my-app-theme" ... />`}>
      <Text size="sm" tone="muted">Use this when you have multiple apps on the same origin.</Text>
    </Story>
    <Story title="Opt-out — persistColorMode={false}" code={`<MercanProvider persistColorMode={false} ... />`}>
      <Text size="sm" tone="muted">
        Disable if you want every visit to start from <code>defaultColorMode</code>.
      </Text>
    </Story>

    <Heading level={3}>MercanProvider props</Heading>
    <PropsTable
      rows={[
        { prop: 'brand', type: '{ primary?: string; secondary?: string }', description: 'Single-color shorthand. Hover/active/contrast derived automatically.' },
        { prop: 'darkBrand', type: '{ primary?: string; secondary?: string }', description: 'Brand colors used only in dark mode. Falls back to `brand`.' },
        { prop: 'lightOverride', type: 'ThemeOverride', description: 'Deep merge into the light theme tokens.' },
        { prop: 'darkOverride', type: 'ThemeOverride', description: 'Deep merge into the dark theme tokens.' },
        { prop: 'defaultColorMode', type: "'light' | 'dark'", defaultValue: "'light'", description: 'Initial color mode (used when nothing is persisted).' },
        { prop: 'persistColorMode', type: 'boolean', defaultValue: 'true', description: 'Save chosen color mode to localStorage and rehydrate on next visit. Cross-tab sync via storage event.' },
        { prop: 'colorModeStorageKey', type: 'string', defaultValue: "'mf-color-mode'", description: 'localStorage key for the persisted color mode.' },
        { prop: 'locale', type: 'string', description: 'Active locale key.' },
        { prop: 'fallbackLocale', type: 'string', description: 'Locale used when a key is missing.' },
        { prop: 'resources', type: 'I18nResources', description: 'Translations keyed by locale.' },
        { prop: 'toastPosition', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", defaultValue: "'top-right'", description: 'Where toasts appear.' },
      ]}
    />
  </VStack>
);
