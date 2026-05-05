import { Heading, Text, VStack, Card, CardBody, HStack, Code as InlineCode } from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

const QUICK = `<MercanProvider
  googleFonts={{
    body: 'Inter',
    heading: { family: 'Sora', weights: [600, 700, 800] },
    mono: 'JetBrains Mono',
  }}
  ...
>
  …
</MercanProvider>`;

const FALLBACK = `<MercanProvider
  googleFonts={{
    body: { family: 'Plus Jakarta Sans', weights: [400, 500, 700], italic: true },
    fallback: {
      body: 'system-ui, -apple-system, sans-serif',
    },
  }}
  ...
/>`;

const MANUAL = `import { loadGoogleFonts, fontStack } from '@yavuzmercan/ui';

loadGoogleFonts([
  { family: 'Inter', weights: [400, 500, 600, 700] },
  { family: 'Sora', weights: [700], display: 'swap' },
]);

<MercanProvider
  lightOverride={{
    fonts: {
      body: fontStack('Inter'),
      heading: fontStack('Sora', 'Georgia, serif'),
    },
  }}
  ...
/>`;

export const FontsPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Fonts</Heading>
    <Text>
      Mercan ships system fonts by default. To use a Google Font, pass a <InlineCode>googleFonts</InlineCode> prop
      to <InlineCode>MercanProvider</InlineCode>. The provider injects the right{' '}
      <InlineCode>&lt;link&gt;</InlineCode> tags (with preconnect) and updates{' '}
      <InlineCode>theme.fonts</InlineCode> to use the loaded family.
    </Text>

    <Card><CardBody>
      <Text size="sm" tone="muted">
        Try changing the font in the customizer at the top of this page — it uses the same{' '}
        <InlineCode>googleFonts</InlineCode> prop and reloads the family on the fly.
      </Text>
    </CardBody></Card>

    <Heading level={3}>Quick setup</Heading>
    <Story title="googleFonts shorthand" code={QUICK}>
      <Text>String form uses default weights <InlineCode>[400, 500, 600, 700]</InlineCode>. Object form lets you customize weights, italic and display strategy.</Text>
    </Story>

    <Heading level={3}>With fallback stack</Heading>
    <Story title="Custom fallback per font" code={FALLBACK}>
      <Text>Provide <InlineCode>fallback</InlineCode> for any of <InlineCode>body</InlineCode>, <InlineCode>heading</InlineCode>, <InlineCode>mono</InlineCode>. Defaults to <InlineCode>system-ui, sans-serif</InlineCode>.</Text>
    </Story>

    <Heading level={3}>Manual loading</Heading>
    <Story title="loadGoogleFonts + fontStack" code={MANUAL}>
      <Text size="sm" tone="muted">
        For total control (e.g. lazy-loading a font on a specific page), call <InlineCode>loadGoogleFonts()</InlineCode> directly.
        It's idempotent — calling it multiple times with the same set is a no-op.
      </Text>
    </Story>

    <Heading level={3}>Props</Heading>
    <PropsTable rows={[
      { prop: 'googleFonts.body', type: 'string | GoogleFontConfig', description: 'Body text font family.' },
      { prop: 'googleFonts.heading', type: 'string | GoogleFontConfig', description: 'Heading font family.' },
      { prop: 'googleFonts.mono', type: 'string | GoogleFontConfig', description: 'Monospaced font family.' },
      { prop: 'googleFonts.fallback', type: '{ body?, heading?, mono? }', description: 'Per-slot fallback stack.' },
    ]} />

    <PropsTable rows={[
      { prop: 'GoogleFontConfig.family', type: 'string', description: 'Google Font family name (case-sensitive, e.g. "Plus Jakarta Sans").' },
      { prop: 'GoogleFontConfig.weights', type: 'number[]', defaultValue: '[400,500,600,700]', description: 'Weights to fetch.' },
      { prop: 'GoogleFontConfig.italic', type: 'boolean', description: 'Also fetch italic variants.' },
      { prop: 'GoogleFontConfig.display', type: "'swap' | 'block' | 'fallback' | 'optional' | 'auto'", defaultValue: "'swap'", description: 'CSS font-display strategy.' },
    ]} />
  </VStack>
);
