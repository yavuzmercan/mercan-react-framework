import { Heading, Text, VStack, Card, CardBody, Button, HStack, Select } from '@yavuzmercan/ui';
import { useTranslation } from '@yavuzmercan/ui';
import { Story } from '../Story';

const RESOURCES_EX = `const resources = {
  en: {
    greet: 'Hello, {name}!',
    items: '{count} item|{count} items',
    nav: { home: 'Home', settings: 'Settings' },
  },
  tr: {
    greet: 'Merhaba, {name}!',
    items: '{count} öğe',
    nav: { home: 'Ana Sayfa', settings: 'Ayarlar' },
  },
};`;

const HOOK_EX = `import { useTranslation } from '@yavuzmercan/ui';

const { t, locale, setLocale, formatNumber, formatDate } = useTranslation();

t('greet', { name: 'Ada' });        // "Hello, Ada!"
t('items', { count: 1 });           // "1 item"
t('items', { count: 5 });           // "5 items"
t('nav.home');                       // "Home"
formatNumber(1234.5);               // "1,234.5"
formatDate(Date.now());             // "12/3/2024"`;

const Demo = () => {
  const { t, locale, setLocale } = useTranslation();
  return (
    <Card><CardBody>
      <HStack gap="md" align="center">
        <Text>{t('docs.demoGreet', { name: 'Ada' })}</Text>
        <Select
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          options={[{ value: 'en', label: 'English' }, { value: 'tr', label: 'Türkçe' }]}
          style={{ width: 120 }}
        />
      </HStack>
    </CardBody></Card>
  );
};

export const I18nPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Internationalization</Heading>
    <Text>
      i18n is built into <code>MercanProvider</code> — no extra dependencies. Provide a
      flat or nested resources object keyed by locale, then call <code>useTranslation()</code>.
    </Text>

    <Story title="Resources shape" code={RESOURCES_EX}>
      <Text tone="muted" size="sm">Both flat keys (<code>greet</code>) and nested paths (<code>nav.home</code>) work.</Text>
    </Story>

    <Story title="Using the hook" code={HOOK_EX}>
      <Text tone="muted" size="sm">
        Pluralization uses a simple <code>singular|plural</code> split based on <code>count</code>.
      </Text>
    </Story>

    <Story title="Live demo" code={`const { t, locale, setLocale } = useTranslation();`}>
      <Demo />
    </Story>
  </VStack>
);
