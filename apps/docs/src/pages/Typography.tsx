import { Heading, Text, VStack, HStack } from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

export const TextPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Text</Heading>
    <Text>Body text with size, weight and tone variants.</Text>
    <Story title="Sizes" code={`<Text size="xs" /> ... <Text size="xl" />`}>
      <VStack gap="xs">
        <Text size="xs">size="xs"</Text>
        <Text size="sm">size="sm"</Text>
        <Text size="md">size="md"</Text>
        <Text size="lg">size="lg"</Text>
        <Text size="xl">size="xl"</Text>
      </VStack>
    </Story>
    <Story title="Tones" code={`<Text tone="muted" />`}>
      <HStack gap="md">
        <Text tone="muted">muted</Text>
        <Text tone="primary">primary</Text>
        <Text tone="success">success</Text>
        <Text tone="warning">warning</Text>
        <Text tone="danger">danger</Text>
      </HStack>
    </Story>
    <Story title="Weight" code={`<Text weight="semibold" />`}>
      <HStack gap="md">
        <Text weight="regular">regular</Text>
        <Text weight="medium">medium</Text>
        <Text weight="semibold">semibold</Text>
        <Text weight="bold">bold</Text>
      </HStack>
    </Story>
    <PropsTable rows={[
      { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Font-size token.' },
      { prop: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold'", defaultValue: "'regular'", description: 'Font-weight token.' },
      { prop: 'tone', type: "'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger' | 'info'", description: 'Color from theme.' },
      { prop: 'truncate', type: 'boolean', description: 'Single-line ellipsis.' },
      { prop: 'as', type: 'ElementType', defaultValue: "'p'", description: 'Render as a different element.' },
    ]} />
  </VStack>
);

export const HeadingPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Heading</Heading>
    <Story title="Levels 1–6" code={`<Heading level={1}>Page title</Heading>`}>
      <VStack gap="sm">
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
      </VStack>
    </Story>
    <PropsTable rows={[
      { prop: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', defaultValue: '2', description: 'Renders the matching <h1>–<h6> tag.' },
    ]} />
  </VStack>
);
