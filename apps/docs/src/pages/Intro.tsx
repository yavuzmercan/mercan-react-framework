import { Heading, Text, VStack, Card, CardBody, HStack, Badge } from '@yavuzmercan/ui';
import { Story } from '../Story';

const QUICK_START = `import '@yavuzmercan/ui/styles.css';
import { MercanProvider, Button } from '@yavuzmercan/ui';

const resources = { en: { hello: 'Hello, {name}!' } };

export const App = () => (
  <MercanProvider
    locale="en"
    resources={resources}
    brand={{ primary: '#ff5a5f', secondary: '#2d3142' }}
  >
    <Button>Click me</Button>
  </MercanProvider>
);`;

export const IntroPage = () => (
  <VStack gap="lg">
    <div>
      <Heading level={1}>Mercan UI</Heading>
      <Text size="lg" tone="muted">
        Theme-aware, i18n-ready React component framework for the web.
      </Text>
    </div>
    <HStack gap="sm">
      <Badge colorScheme="primary">v0.1.0</Badge>
      <Badge colorScheme="neutral">React 18+</Badge>
      <Badge colorScheme="neutral">TypeScript</Badge>
    </HStack>
    <Text>
      Mercan ships 35+ components, a token-driven theme, simple i18n, and a curated icon set —
      all designed to be customized at every layer. Start with one prop (<code>brand</code>),
      override individual tokens (<code>lightOverride</code>), or replace CSS variables directly
      in your stylesheet.
    </Text>
    <Story title="Quick start" code={QUICK_START}>
      <Card shadow>
        <CardBody>
          <Text>Open the customizer at the top to change colors live across all pages.</Text>
        </CardBody>
      </Card>
    </Story>
    <Heading level={3}>What's inside</Heading>
    <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
      <li><strong>@yavuzmercan/ui</strong> — ThemeProvider, I18nProvider, color utils, hooks</li>
      <li><strong>@yavuzmercan/ui</strong> — 35+ components, single CSS file</li>
      <li><strong>@yavuzmercan/ui</strong> — 30+ tree-shakeable SVG icons</li>
    </ul>
  </VStack>
);
