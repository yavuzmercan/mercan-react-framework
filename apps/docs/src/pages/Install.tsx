import { Heading, Text, VStack, Alert } from '@yavuzmercan/ui';
import { Story } from '../Story';

const PKG = `npm install @yavuzmercan/ui @yavuzmercan/ui @yavuzmercan/ui`;

const SETUP = `import '@yavuzmercan/ui/styles.css';
import { MercanProvider } from '@yavuzmercan/ui';

const resources = {
  en: { greet: 'Hello, {name}' },
  tr: { greet: 'Merhaba, {name}' },
};

export const App = () => (
  <MercanProvider
    locale="en"
    fallbackLocale="en"
    resources={resources}
    brand={{ primary: '#3b6cff' }}
  >
    {/* your app */}
  </MercanProvider>
);`;

export const InstallPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Installation</Heading>
    <Text>Mercan is delivered as three packages. Install all three:</Text>
    <Story title="Install" code={PKG}>
      <Text tone="muted" size="sm">npm, pnpm and yarn are all supported.</Text>
    </Story>
    <Heading level={3}>Provider setup</Heading>
    <Text>
      Wrap your application with <code>MercanProvider</code>. This sets up theming, i18n,
      and the toast region in one go.
    </Text>
    <Story title="App.tsx" code={SETUP}>
      <Alert status="info" title="Tip">
        Don't forget to import <code>@yavuzmercan/ui/styles.css</code> at your app root.
      </Alert>
    </Story>
  </VStack>
);
