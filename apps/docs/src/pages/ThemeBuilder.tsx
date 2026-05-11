import { useMemo, useState } from 'react';
import {
  Heading, Text, VStack, HStack, Stack, Grid, Box, Card, CardBody, CardHeader, CardFooter,
  Button, IconButton, Input, TextArea, Checkbox, Switch, Slider, Select, FormField,
  Avatar, Badge, Tag, Progress, Spinner, List, ListItem,
  Alert, Tooltip, Divider, Spacer,
  presets, type PresetName,
} from '@yavuzmercan/ui';
import {
  Heart, Bell, Settings, Plus, Download, Check, ChevronRight, Mail, Star,
  CheckCircle, AlertTriangle, Info, Copy, RotateCw,
} from '@yavuzmercan/ui/icons';
import type { CustomizerState } from '../ThemeCustomizer';
import { DEFAULT_CUSTOMIZER, FONT_OPTIONS } from '../ThemeCustomizer';

interface Props {
  state: CustomizerState;
  onChange: (state: CustomizerState) => void;
}

const PRESET_ENTRIES = Object.entries(presets) as Array<[PresetName, (typeof presets)[PresetName]]>;

const buildCss = (s: CustomizerState): string => {
  const lines: string[] = [':root {'];
  lines.push(`  --mf-color-primary: ${s.primary};`);
  lines.push(`  --mf-color-secondary: ${s.secondary};`);
  lines.push(`  --mf-radius-sm: ${Math.max(2, s.radius - 4)}px;`);
  lines.push(`  --mf-radius-md: ${s.radius}px;`);
  lines.push(`  --mf-radius-lg: ${s.radius + 4}px;`);
  lines.push(`  --mf-radius-xl: ${s.radius + 8}px;`);
  if (s.font !== 'System') {
    lines.push(`  --mf-font-body: '${s.font}', system-ui, sans-serif;`);
    lines.push(`  --mf-font-heading: '${s.font}', system-ui, sans-serif;`);
  }
  lines.push('}');
  if (s.darkPrimary || s.darkSecondary) {
    lines.push('');
    lines.push('[data-mf-color-mode="dark"] {');
    if (s.darkPrimary) lines.push(`  --mf-color-primary: ${s.darkPrimary};`);
    if (s.darkSecondary) lines.push(`  --mf-color-secondary: ${s.darkSecondary};`);
    lines.push('}');
  }
  return lines.join('\n');
};

const buildProvider = (s: CustomizerState): string => {
  const lines: string[] = ['<MercanProvider'];
  lines.push('  defaultColorMode="light"');
  lines.push('  locale="en"');
  lines.push('  fallbackLocale="en"');
  lines.push('  resources={resources}');
  if (s.preset !== 'system') {
    lines.push(`  preset="${s.preset}"`);
  }
  lines.push(`  brand={{ primary: '${s.primary}', secondary: '${s.secondary}' }}`);
  if (s.darkPrimary || s.darkSecondary) {
    const dp = s.darkPrimary || s.primary;
    const ds = s.darkSecondary || s.secondary;
    lines.push(`  darkBrand={{ primary: '${dp}', secondary: '${ds}' }}`);
  }
  if (s.font !== 'System') {
    lines.push(`  googleFonts={{ body: '${s.font}', heading: '${s.font}' }}`);
  }
  lines.push('  lightOverride={{');
  lines.push('    radii: {');
  lines.push(`      sm: '${Math.max(2, s.radius - 4)}px',`);
  lines.push(`      md: '${s.radius}px',`);
  lines.push(`      lg: '${s.radius + 4}px',`);
  lines.push(`      xl: '${s.radius + 8}px',`);
  lines.push('    },');
  lines.push('  }}');
  lines.push('>');
  lines.push('  {children}');
  lines.push('</MercanProvider>');
  return lines.join('\n');
};

const CodeBlock = ({ code, label }: { code: string; label: string }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <Box bg="surfaceAlt" radius="md" border>
      <HStack
        align="center"
        gap="sm"
        style={{
          padding: '8px 12px',
          borderBottom: '1px solid var(--mf-color-border)',
          fontSize: 'var(--mf-fs-xs)',
          color: 'var(--mf-color-textMuted)',
        }}
      >
        <Text size="xs" tone="muted">{label}</Text>
        <Spacer />
        <Button
          size="sm"
          variant="ghost"
          leftIcon={copied ? <Check size={14} /> : <Copy size={14} />}
          onClick={onCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </HStack>
      <pre
        style={{
          margin: 0,
          padding: 'var(--mf-spacing-md)',
          fontSize: 'var(--mf-fs-xs)',
          fontFamily: 'var(--mf-font-mono)',
          overflow: 'auto',
          maxHeight: 320,
        }}
      >
        <code>{code}</code>
      </pre>
    </Box>
  );
};

const PresetGallery = ({ state, onChange }: Props) => (
  <VStack gap="md">
    <HStack gap="sm" align="center">
      <Heading level={4}>Theme presets</Heading>
      <Spacer />
      <Text tone="muted" size="sm">{PRESET_ENTRIES.length} built-in themes — click to apply</Text>
    </HStack>
    <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
      <PresetCard
        name="Default"
        description="Mercan's neutral default."
        active={state.preset === 'system'}
        primary="#3b6cff"
        secondary="#6b7280"
        onClick={() => onChange({ ...state, preset: 'system', primary: '#3b6cff', secondary: '#6b7280', darkPrimary: '', darkSecondary: '' })}
      />
      {PRESET_ENTRIES.map(([key, p]) => {
        const lightColors = (p.light?.colors ?? {}) as Record<string, string>;
        const darkColors = (p.dark?.colors ?? {}) as Record<string, string>;
        return (
          <PresetCard
            key={key}
            name={p.name}
            description={p.description ?? ''}
            active={state.preset === key}
            primary={lightColors.primary ?? '#3b6cff'}
            secondary={lightColors.secondary ?? '#6b7280'}
            onClick={() =>
              onChange({
                ...state,
                preset: key,
                primary: lightColors.primary ?? state.primary,
                secondary: lightColors.secondary ?? state.secondary,
                darkPrimary: darkColors.primary ?? '',
                darkSecondary: darkColors.secondary ?? '',
              })
            }
          />
        );
      })}
    </Grid>
  </VStack>
);

const PresetCard = ({
  name,
  description,
  active,
  primary,
  secondary,
  onClick,
}: {
  name: string;
  description: string;
  active: boolean;
  primary: string;
  secondary: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      textAlign: 'left',
      cursor: 'pointer',
      padding: 0,
      background: 'transparent',
      border: `2px solid ${active ? primary : 'var(--mf-color-border)'}`,
      borderRadius: 'var(--mf-radius-md)',
      transition: 'border-color 0.15s',
    }}
  >
    <Box bg="surface" radius="md" p="md">
      <HStack gap="sm" align="center" style={{ marginBottom: 'var(--mf-spacing-sm)' }}>
        <span style={{ width: 24, height: 24, borderRadius: 6, background: primary, border: '1px solid var(--mf-color-borderSubtle)' }} />
        <span style={{ width: 24, height: 24, borderRadius: 6, background: secondary, border: '1px solid var(--mf-color-borderSubtle)' }} />
        <Spacer />
        {active && <Badge colorScheme="primary"><HStack gap="xs" align="center"><Check size={10} /> Active</HStack></Badge>}
      </HStack>
      <Text weight="semibold">{name}</Text>
      <Text tone="muted" size="sm" style={{ minHeight: '2.5em' }}>{description || '—'}</Text>
    </Box>
  </button>
);

const Controls = ({ state, onChange }: Props) => (
  <Card>
    <CardHeader><Heading level={5}>Brand & shape</Heading></CardHeader>
    <CardBody>
      <VStack gap="md">
        <Grid columns={{ base: 1, sm: 2 }} gap="md">
          <FormField label="Primary (light)">
            <HStack gap="sm" align="center">
              <input
                type="color"
                value={state.primary}
                onChange={(e) => onChange({ ...state, primary: e.target.value, preset: 'system' })}
                style={{ width: 40, height: 40, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
              />
              <Input
                value={state.primary}
                onChange={(e) => onChange({ ...state, primary: e.target.value, preset: 'system' })}
              />
            </HStack>
          </FormField>
          <FormField label="Secondary (light)">
            <HStack gap="sm" align="center">
              <input
                type="color"
                value={state.secondary}
                onChange={(e) => onChange({ ...state, secondary: e.target.value, preset: 'system' })}
                style={{ width: 40, height: 40, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
              />
              <Input
                value={state.secondary}
                onChange={(e) => onChange({ ...state, secondary: e.target.value, preset: 'system' })}
              />
            </HStack>
          </FormField>
          <FormField label="Primary (dark — optional)" helpText="Empty falls back to light primary">
            <HStack gap="sm" align="center">
              <input
                type="color"
                value={state.darkPrimary || state.primary}
                onChange={(e) => onChange({ ...state, darkPrimary: e.target.value, preset: 'system' })}
                style={{ width: 40, height: 40, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
              />
              <Input
                placeholder="(uses light)"
                value={state.darkPrimary}
                onChange={(e) => onChange({ ...state, darkPrimary: e.target.value, preset: 'system' })}
              />
            </HStack>
          </FormField>
          <FormField label="Secondary (dark — optional)">
            <HStack gap="sm" align="center">
              <input
                type="color"
                value={state.darkSecondary || state.secondary}
                onChange={(e) => onChange({ ...state, darkSecondary: e.target.value, preset: 'system' })}
                style={{ width: 40, height: 40, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
              />
              <Input
                placeholder="(uses light)"
                value={state.darkSecondary}
                onChange={(e) => onChange({ ...state, darkSecondary: e.target.value, preset: 'system' })}
              />
            </HStack>
          </FormField>
        </Grid>
        <Grid columns={{ base: 1, sm: 2 }} gap="md">
          <FormField label={`Radius — ${state.radius}px`} helpText="Controls all radii (sm/md/lg/xl derived)">
            <Slider
              value={state.radius}
              min={0}
              max={20}
              onChange={(e) => onChange({ ...state, radius: Number(e.target.value) })}
            />
          </FormField>
          <FormField label="Font family" helpText="Loaded from Google Fonts on demand">
            <Select
              value={state.font}
              onChange={(e) => onChange({ ...state, font: e.target.value })}
              options={FONT_OPTIONS.map((f) => ({ value: f, label: f }))}
            />
          </FormField>
        </Grid>
      </VStack>
    </CardBody>
    <CardFooter>
      <HStack gap="sm">
        <Spacer />
        <Button
          variant="ghost"
          leftIcon={<RotateCw size={14} />}
          onClick={() => onChange(DEFAULT_CUSTOMIZER)}
        >
          Reset to defaults
        </Button>
      </HStack>
    </CardFooter>
  </Card>
);

const Preview = () => {
  const [text, setText] = useState('Ada Lovelace');
  const [agree, setAgree] = useState(true);
  const [notify, setNotify] = useState(true);
  const [vol, setVol] = useState(40);

  return (
    <Card>
      <CardHeader>
        <HStack align="center" gap="sm">
          <Heading level={5}>Live preview</Heading>
          <Spacer />
          <Text tone="muted" size="sm">Reflects every change instantly</Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack gap="lg">
          <Stack direction={{ base: 'column', md: 'row' }} gap="md">
            <Box style={{ flex: 1 }}>
              <VStack gap="sm">
                <Heading level={6}>Buttons</Heading>
                <HStack gap="sm" wrap>
                  <Button leftIcon={<Plus size={14} />}>Primary</Button>
                  <Button colorScheme="secondary" leftIcon={<Download size={14} />}>Secondary</Button>
                  <Button colorScheme="success" leftIcon={<Check size={14} />}>Success</Button>
                  <Button colorScheme="danger">Danger</Button>
                </HStack>
                <HStack gap="sm" wrap>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <IconButton aria-label="Like" icon={<Heart size={16} />} />
                  <IconButton aria-label="Settings" variant="outline" icon={<Settings size={16} />} />
                  <IconButton aria-label="Bell" variant="ghost" icon={<Bell size={16} />} />
                </HStack>
              </VStack>
            </Box>
            <Box style={{ flex: 1 }}>
              <VStack gap="sm">
                <Heading level={6}>Form</Heading>
                <FormField label="Name" required>
                  <Input value={text} onChange={(e) => setText(e.target.value)} />
                </FormField>
                <FormField label={`Volume: ${vol}`}>
                  <Slider value={vol} min={0} max={100} onChange={(e) => setVol(Number(e.target.value))} />
                </FormField>
                <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} label="I agree to the terms" />
                <Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} label="Email notifications" />
              </VStack>
            </Box>
          </Stack>

          <Divider />

          <VStack gap="sm">
            <Heading level={6}>Display</Heading>
            <HStack gap="sm" wrap align="center">
              <Avatar name="Ada Lovelace" />
              <Avatar name="Linus Torvalds" />
              <Avatar size="lg" name="Grace Hopper" />
              <Badge colorScheme="primary"><HStack gap="xs" align="center"><Star size={10} /> New</HStack></Badge>
              <Badge colorScheme="success"><HStack gap="xs" align="center"><Check size={10} /> Active</HStack></Badge>
              <Badge colorScheme="warning">Pending</Badge>
              <Badge colorScheme="danger">Failed</Badge>
              <Tag>react</Tag>
              <Tag onClose={() => {}}>typescript</Tag>
              <Tooltip label="Hover-only message">
                <Button size="sm" variant="outline">Tooltip</Button>
              </Tooltip>
            </HStack>
            <HStack gap="sm" align="center">
              <Spinner size="sm" /> <Spinner /> <Spinner size="lg" />
              <Spacer />
              <Box style={{ flex: 2, maxWidth: 240 }}><Progress value={62} /></Box>
            </HStack>
          </VStack>

          <Divider />

          <VStack gap="sm">
            <Heading level={6}>Feedback</Heading>
            <Alert status="info" title="Heads up" icon={<Info size={20} />}>An informational message.</Alert>
            <Alert status="success" title="Saved" icon={<CheckCircle size={20} />}>Changes stored.</Alert>
            <Alert status="warning" title="Quota" icon={<AlertTriangle size={20} />}>You're using 80%.</Alert>
          </VStack>

          <Divider />

          <Card>
            <List interactive>
              <ListItem>
                <HStack align="center" gap="md">
                  <Mail size={20} color="var(--mf-color-primary)" />
                  <VStack gap="none">
                    <Text weight="medium">Inbox</Text>
                    <Text tone="muted" size="sm">3 new messages</Text>
                  </VStack>
                  <Spacer />
                  <Badge colorScheme="primary">3</Badge>
                  <ChevronRight size={16} color="var(--mf-color-textMuted)" />
                </HStack>
              </ListItem>
              <ListItem>
                <HStack align="center" gap="md">
                  <Settings size={20} color="var(--mf-color-textMuted)" />
                  <Text weight="medium">Settings</Text>
                  <Spacer />
                  <ChevronRight size={16} color="var(--mf-color-textMuted)" />
                </HStack>
              </ListItem>
            </List>
          </Card>
        </VStack>
      </CardBody>
    </Card>
  );
};

const Output = ({ state }: { state: CustomizerState }) => {
  const css = useMemo(() => buildCss(state), [state]);
  const tsx = useMemo(() => buildProvider(state), [state]);
  return (
    <VStack gap="md">
      <HStack align="center" gap="sm">
        <Heading level={4}>Generated code</Heading>
        <Spacer />
        <Text tone="muted" size="sm">Copy either snippet into your project</Text>
      </HStack>
      <Stack direction={{ base: 'column', lg: 'row' }} gap="md">
        <Box style={{ flex: 1, minWidth: 0 }}>
          <CodeBlock label="MercanProvider config (TSX)" code={tsx} />
        </Box>
        <Box style={{ flex: 1, minWidth: 0 }}>
          <CodeBlock label="CSS variables" code={css} />
        </Box>
      </Stack>
      <Text tone="muted" size="sm">
        TSX form is the recommended path — Mercan derives hover/active/contrast variants for you.
        Use the CSS form when you can't use the JS API (e.g. Tailwind preflight, MDX previews).
      </Text>
    </VStack>
  );
};

export const ThemeBuilderPage = ({ state, onChange }: Props) => (
  <VStack gap="2xl">
    <VStack gap="sm">
      <Heading level={1}>Theme builder</Heading>
      <Text size="lg" tone="muted">
        Pick a preset, tweak brand colors, radius, and font. Every change persists across reloads
        (localStorage). Copy the generated config into your app when you're done.
      </Text>
    </VStack>

    <PresetGallery state={state} onChange={onChange} />

    <Stack direction={{ base: 'column', xl: 'row' }} gap="lg">
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Controls state={state} onChange={onChange} />
      </Box>
      <Box style={{ flex: 2, minWidth: 0 }}>
        <Preview />
      </Box>
    </Stack>

    <Output state={state} />
  </VStack>
);
