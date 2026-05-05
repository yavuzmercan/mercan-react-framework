import {
  Heading, Text, VStack, HStack, Stack, Grid, Box, Divider, Container, Card, CardBody,
} from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

const sample = (label: string) => (
  <Box bg="surfaceAlt" p="md" radius="md" border>
    <Text size="sm">{label}</Text>
  </Box>
);

export const BoxPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Box</Heading>
    <Text>The lowest-level building block. Accepts spacing, background, radius and shadow shortcuts.</Text>
    <Story title="Padding & background" code={`<Box p="lg" bg="surfaceAlt" radius="md" border>\n  Content\n</Box>`}>
      <Box p="lg" bg="surfaceAlt" radius="md" border>Content</Box>
    </Story>
    <Story title="Polymorphic" code={`<Box as="section" py="xl">…</Box>`}>
      <Box as="section" py="xl" bg="surface" border radius="md" px="lg">As a section</Box>
    </Story>
    <PropsTable rows={[
      { prop: 'as', type: 'ElementType', defaultValue: "'div'", description: 'Render as a different HTML element.' },
      { prop: 'p / px / py', type: 'SpacingKey', description: 'Padding shortcuts using theme tokens.' },
      { prop: 'm / mx / my', type: 'SpacingKey', description: 'Margin shortcuts.' },
      { prop: 'bg', type: "'background' | 'surface' | 'surfaceAlt'", description: 'Background color from theme.' },
      { prop: 'radius', type: 'RadiusKey', description: 'Border radius token.' },
      { prop: 'border', type: 'boolean', description: 'Adds a 1px border using theme.colors.border.' },
      { prop: 'shadow', type: "'sm' | 'md' | 'lg' | 'xl'", description: 'Box shadow token.' },
    ]} />
  </VStack>
);

export const StackPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Stack / HStack / VStack</Heading>
    <Text>Flex containers with token-based gap.</Text>
    <Story title="HStack with gap" code={`<HStack gap="md">\n  <Box>A</Box>\n  <Box>B</Box>\n</HStack>`}>
      <HStack gap="md">{sample('A')}{sample('B')}{sample('C')}</HStack>
    </Story>
    <Story title="VStack with align" code={`<VStack gap="sm" align="end">…</VStack>`}>
      <VStack gap="sm" align="end">{sample('A')}{sample('Bigger label')}</VStack>
    </Story>
    <Story title="Stack direction='row' justify='between'" code={`<Stack direction="row" justify="between">…</Stack>`}>
      <Stack direction="row" justify="between">{sample('left')}{sample('right')}</Stack>
    </Story>
    <PropsTable rows={[
      { prop: 'direction', type: "'row' | 'column'", defaultValue: "'column'", description: 'Flex direction.' },
      { prop: 'gap', type: 'SpacingKey', defaultValue: "'md'", description: 'Gap between children.' },
      { prop: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", description: 'justify-content shortcut.' },
      { prop: 'align', type: "'start' | 'center' | 'end' | 'stretch'", description: 'align-items shortcut.' },
      { prop: 'wrap', type: 'boolean', description: 'Allow children to wrap.' },
    ]} />
  </VStack>
);

export const GridPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Grid</Heading>
    <Text>CSS grid with token-based gaps.</Text>
    <Story title="3-column grid" code={`<Grid columns={3} gap="md">…</Grid>`}>
      <Grid columns={3} gap="md">
        {sample('1')}{sample('2')}{sample('3')}{sample('4')}{sample('5')}{sample('6')}
      </Grid>
    </Story>
    <PropsTable rows={[
      { prop: 'columns', type: 'number | string', description: 'Number of equal columns or any CSS grid-template-columns value.' },
      { prop: 'rows', type: 'number | string', description: 'Number of equal rows or grid-template-rows value.' },
      { prop: 'gap', type: 'SpacingKey', description: 'Gap shortcut.' },
    ]} />
  </VStack>
);

export const DividerPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Divider</Heading>
    <Story title="Horizontal" code={`<Divider />`}>
      <Card><CardBody><Text>Above</Text><Divider /><Text>Below</Text></CardBody></Card>
    </Story>
    <Story title="Vertical" code={`<Divider orientation="vertical" />`}>
      <HStack gap="md" align="stretch" style={{ height: 40 }}>
        <Text>A</Text><Divider orientation="vertical" /><Text>B</Text>
      </HStack>
    </Story>
  </VStack>
);

export const ContainerPage = () => (
  <VStack gap="lg">
    <Heading level={1}>Container</Heading>
    <Text>Centers content with a max-width and responsive padding.</Text>
    <Story title="Sizes" code={`<Container size="md">…</Container>`}>
      <Container size="md">{sample('size="md" — 768px max')}</Container>
    </Story>
    <PropsTable rows={[
      { prop: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: "'lg'", description: 'Max-width breakpoint.' },
    ]} />
  </VStack>
);
