import { useState } from 'react';
import {
  ThemeProvider,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Button,
  Badge,
  Input,
  Switch,
  SimpleGrid,
  Box,
  presets,
  type PresetName,
} from '@yavuzmercan/ui';
import { Story } from '../Story';

const ALL_PRESETS = Object.entries(presets) as [PresetName, typeof presets[PresetName]][];

const SETUP_CODE = `import { MercanProvider, presets } from '@yavuzmercan/ui';

// Option A — shorthand
<MercanProvider preset="nord" locale="en" resources={{}}>
  <App />
</MercanProvider>

// Option B — composable (lets you pick light/dark independently)
<MercanProvider
  lightOverride={presets.solarized.light}
  darkOverride={presets.dracula.dark}
  locale="en"
  resources={{}}
>
  <App />
</MercanProvider>

// Option C — preset + brand override on top
<MercanProvider preset="nord" brand={{ primary: '#ff5a5f' }} ... />`;

const PresetCard = ({ name, preset }: { name: PresetName; preset: typeof presets[PresetName] }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  return (
    <Card>
      <ThemeProvider
        scope="local"
        defaultColorMode={mode}
        light={preset.light}
        dark={preset.dark}
        persistColorMode={false}
      >
        {/* Re-render the preview when mode toggles */}
        <CardBody>
          <VStack gap="md">
            <HStack align="center">
              <VStack gap="none">
                <Text size="xs" tone="muted" weight="semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  preset="{name}"
                </Text>
                <Heading level={4} style={{ marginTop: 4 }}>{preset.name}</Heading>
              </VStack>
              <Box style={{ marginLeft: 'auto' }}>
                <Switch
                  checked={mode === 'dark'}
                  onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
                  label={mode === 'dark' ? 'Dark' : 'Light'}
                />
              </Box>
            </HStack>
            {preset.description && <Text size="sm" tone="muted">{preset.description}</Text>}

            {/* Mini-app preview using THIS preset's tokens via local scope */}
            <Box
              style={{
                padding: 'var(--mf-spacing-md)',
                background: 'var(--mf-color-background)',
                color: 'var(--mf-color-text)',
                border: '1px solid var(--mf-color-border)',
                borderRadius: 'var(--mf-radius-md)',
              }}
            >
              <VStack gap="sm">
                <HStack gap="xs" wrap>
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                  <Button size="sm" colorScheme="danger">Danger</Button>
                </HStack>
                <HStack gap="xs" wrap>
                  <Badge colorScheme="primary">primary</Badge>
                  <Badge colorScheme="success">success</Badge>
                  <Badge colorScheme="warning">warning</Badge>
                  <Badge colorScheme="danger">danger</Badge>
                  <Badge colorScheme="info">info</Badge>
                </HStack>
                <Input placeholder="Sample input" />
                <Text size="xs" tone="muted">
                  Sample muted text — ipsum dolor sit amet.
                </Text>
              </VStack>
            </Box>
          </VStack>
        </CardBody>
      </ThemeProvider>
    </Card>
  );
};

export const PresetsPage = () => (
  <VStack gap="lg">
    <div>
      <Heading level={1}>Theme presets</Heading>
      <Text size="lg" tone="muted">
        Eight pre-built color palettes. One prop, full theme. Combine with
        <code> brand</code>, <code>googleFonts</code>, or token overrides for fine-tuning.
      </Text>
    </div>

    <Story title="Setup" code={SETUP_CODE}>
      <Text size="sm" tone="muted">
        The <code>preset</code> prop sits at the bottom of the override stack —
        <code> brand</code>, fonts, and explicit overrides still win.
      </Text>
    </Story>

    <Heading level={3}>Gallery</Heading>
    <Text tone="muted">
      Each card runs in a <em>local-scoped</em> <code>ThemeProvider</code>, so you can preview the
      preset without affecting the rest of the page. Toggle the switch to see light vs. dark.
    </Text>

    <SimpleGrid columns={2} gap="lg">
      {ALL_PRESETS.map(([name, preset]) => (
        <PresetCard key={name} name={name} preset={preset} />
      ))}
    </SimpleGrid>

    <Heading level={3}>Building your own preset</Heading>
    <Story title="createPresetColors helper" code={`import { createPresetColors, type ThemePreset } from '@yavuzmercan/ui';

export const myBrand: ThemePreset = {
  name: 'My Brand',
  light: {
    colors: createPresetColors({
      mode: 'light',
      background: '#ffffff',
      surfaceAlt: '#f8f8f8',
      border: '#e5e5e5',
      text: '#111111',
      primary: '#ff5a5f',     // your brand
      secondary: '#2d3142',
      success: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0284c7',
    }),
  },
  dark: { /* … */ },
};

<MercanProvider lightOverride={myBrand.light} darkOverride={myBrand.dark} ... />`}>
      <Text size="sm" tone="muted">
        <code>createPresetColors</code> takes ~12 colors and expands them to all 26 theme slots —
        hover/active/contrast/focus-ring all derived automatically.
      </Text>
    </Story>
  </VStack>
);
