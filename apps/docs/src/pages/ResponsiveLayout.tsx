import {
  Heading, Text, VStack, Box, Card, CardBody, Badge,
  Grid, GridItem, SimpleGrid, Stack, HStack, Row, Col,
  useBreakpoint, useBreakpointDown,
} from '@yavuzmercan/ui';
import { Story, PropsTable } from '../Story';

const Tile = ({ children, color = 'primary' }: { children: React.ReactNode; color?: 'primary' | 'success' | 'warning' | 'info' }) => (
  <Box
    style={{
      padding: 'var(--mf-spacing-md)',
      background: `color-mix(in srgb, var(--mf-color-${color}) 12%, transparent)`,
      border: `1px solid color-mix(in srgb, var(--mf-color-${color}) 30%, transparent)`,
      borderRadius: 'var(--mf-radius-md)',
      textAlign: 'center',
      fontSize: 'var(--mf-fs-sm)',
      color: 'var(--mf-color-text)',
    }}
  >
    {children}
  </Box>
);

const BreakpointReadout = () => {
  const bp = useBreakpoint();
  const isMobile = useBreakpointDown('md');
  return (
    <Card><CardBody>
      <HStack gap="md" align="center" wrap>
        <Badge colorScheme="primary">{bp}</Badge>
        <Text size="sm" tone="muted">
          Active breakpoint • {isMobile ? 'Mobile layout' : 'Desktop layout'}
        </Text>
        <Text size="sm" tone="muted">
          Resize the browser to see the demos respond.
        </Text>
      </HStack>
    </CardBody></Card>
  );
};

/* ===== Page ===== */

export const ResponsiveLayoutPage = () => (
  <VStack gap="lg">
    <div>
      <Heading level={1}>Responsive layouts</Heading>
      <Text size="lg" tone="muted">
        Two complementary patterns: a modern responsive-object API on every layout component,
        and a familiar Bootstrap-style 12-column <code>Row</code> / <code>Col</code> system.
      </Text>
    </div>

    <BreakpointReadout />

    <Heading level={3}>Breakpoints</Heading>
    <Text>
      Built-in breakpoint tokens. All hooks and CSS media queries use these values.
    </Text>
    <PropsTable rows={[
      { prop: 'sm', type: '640px', description: 'Small (large phones, small tablets)' },
      { prop: 'md', type: '768px', description: 'Medium (tablets)' },
      { prop: 'lg', type: '1024px', description: 'Large (small laptops)' },
      { prop: 'xl', type: '1280px', description: 'Extra large (desktop)' },
      { prop: '2xl', type: '1536px', description: 'Extra extra large (wide monitors)' },
    ]} />

    {/* ============ Pattern 1 — Responsive object ============ */}
    <Heading level={3}>Pattern 1 — Responsive object on layout components</Heading>
    <Text>
      <code>Grid</code>, <code>SimpleGrid</code>, and <code>Stack</code> accept a per-breakpoint
      object for their key props. Modern, clean, no extra components.
    </Text>

    <Story
      title="Grid columns — responsive"
      code={`<Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: 'sm', md: 'md' }}>
  {tiles}
</Grid>`}
    >
      <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: 'sm', md: 'md' }}>
        <Tile>1</Tile>
        <Tile>2</Tile>
        <Tile>3</Tile>
        <Tile>4</Tile>
        <Tile>5</Tile>
        <Tile>6</Tile>
        <Tile>7</Tile>
        <Tile>8</Tile>
      </Grid>
    </Story>

    <Story
      title="GridItem — colSpan responsive"
      code={`<Grid columns={{ base: 1, md: 4 }} gap="md">
  <GridItem colSpan={{ base: 1, md: 4 }}><Hero /></GridItem>
  <GridItem colSpan={{ base: 1, md: 2 }}><Card /></GridItem>
  <GridItem colSpan={{ base: 1, md: 1 }}><Card /></GridItem>
  <GridItem colSpan={{ base: 1, md: 1 }}><Card /></GridItem>
</Grid>`}
    >
      <Grid columns={{ base: 1, md: 4 }} gap="md">
        <GridItem colSpan={{ base: 1, md: 4 }}><Tile color="primary">Full-width hero (colSpan: full row)</Tile></GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}><Tile color="success">Half (md: 2)</Tile></GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }}><Tile color="info">Quarter (md: 1)</Tile></GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }}><Tile color="warning">Quarter (md: 1)</Tile></GridItem>
      </Grid>
    </Story>

    <Story
      title="Stack direction — flips axis on breakpoint"
      code={`<Stack direction={{ base: 'column', md: 'row' }} gap="md">
  <Card>...</Card>
  <Card>...</Card>
</Stack>`}
    >
      <Stack direction={{ base: 'column', md: 'row' }} gap="md">
        <Tile>Stacks vertically on mobile</Tile>
        <Tile color="success">Side-by-side on tablet+</Tile>
        <Tile color="warning">Same here</Tile>
      </Stack>
    </Story>

    <Story
      title="SimpleGrid — minChildWidth (auto-fit)"
      code={`<SimpleGrid minChildWidth={{ base: 140, md: 200 }} gap="md">{...}</SimpleGrid>`}
    >
      <SimpleGrid minChildWidth={{ base: 140, md: 200 }} gap="md">
        <Tile>Auto-fit 1</Tile>
        <Tile color="success">Auto-fit 2</Tile>
        <Tile color="info">Auto-fit 3</Tile>
        <Tile color="warning">Auto-fit 4</Tile>
        <Tile>Auto-fit 5</Tile>
      </SimpleGrid>
    </Story>

    {/* ============ Pattern 2 — Bootstrap Row/Col ============ */}
    <Heading level={3}>Pattern 2 — Bootstrap-style Row + Col (12-grid)</Heading>
    <Text>
      Classic 12-column grid for developers coming from Bootstrap, MUI Grid, or Antd. Each
      <code> Col</code> takes a base <code>span</code> and per-breakpoint overrides.
    </Text>

    <Story
      title="Three columns — responsive break to one"
      code={`<Row gutter="md">
  <Col span={12} md={4}>A</Col>
  <Col span={12} md={4}>B</Col>
  <Col span={12} md={4}>C</Col>
</Row>`}
    >
      <Row gutter="md">
        <Col span={12} md={4}><Tile>span 12 / md 4</Tile></Col>
        <Col span={12} md={4}><Tile color="success">span 12 / md 4</Tile></Col>
        <Col span={12} md={4}><Tile color="info">span 12 / md 4</Tile></Col>
      </Row>
    </Story>

    <Story
      title="Asymmetric layout — sidebar + main"
      code={`<Row gutter="md">
  <Col span={12} md={4} lg={3}><Sidebar /></Col>
  <Col span={12} md={8} lg={9}><Main /></Col>
</Row>`}
    >
      <Row gutter="md">
        <Col span={12} md={4} lg={3}><Tile color="primary">Sidebar (md: 4, lg: 3)</Tile></Col>
        <Col span={12} md={8} lg={9}><Tile color="info">Main (md: 8, lg: 9)</Tile></Col>
      </Row>
    </Story>

    <Story
      title="Auto + fill — flex-style sizing"
      code={`<Row gutter="md" align="center">
  <Col span="auto"><Avatar /></Col>
  <Col span="fill"><Title /></Col>
  <Col span="auto"><Action /></Col>
</Row>`}
    >
      <Row gutter="md" align="center">
        <Col span="auto"><Tile>auto (intrinsic)</Tile></Col>
        <Col span="fill"><Tile color="success">fill (takes remaining space)</Tile></Col>
        <Col span="auto"><Tile color="warning">auto</Tile></Col>
      </Row>
    </Story>

    <Story
      title="Offset and order"
      code={`<Row gutter="md">
  <Col span={12} md={4} order={2}>Second visually</Col>
  <Col span={12} md={4} offset={4} order={1}>First visually (md offset 4)</Col>
</Row>`}
    >
      <Row gutter="md">
        <Col span={12} md={4} order={2}><Tile>order: 2</Tile></Col>
        <Col span={12} md={4} offset={4} order={1}><Tile color="success">offset 4 / order: 1</Tile></Col>
      </Row>
    </Story>

    <Heading level={3}>Col props</Heading>
    <PropsTable rows={[
      { prop: 'span', type: 'number | "auto" | "fill"', description: 'Default span (1–12). `auto` = intrinsic width; `fill` = remaining space.' },
      { prop: 'sm / md / lg / xl / 2xl', type: 'number | "auto" | "fill"', description: 'Per-breakpoint span override.' },
      { prop: 'offset', type: 'number', description: 'Left margin in 12-grid units (0–11).' },
      { prop: 'order', type: 'number', description: 'Display order within the row.' },
    ]} />

    <Heading level={3}>Row props</Heading>
    <PropsTable rows={[
      { prop: 'gutter', type: 'SpacingKey', defaultValue: "'md'", description: 'Gap between cols and wrapped rows.' },
      { prop: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", description: 'Horizontal alignment of cols.' },
      { prop: 'align', type: "'start' | 'center' | 'end' | 'stretch'", description: 'Vertical alignment of cols.' },
      { prop: 'reverse', type: 'boolean', description: 'Reverse column order (uses flex-direction: row-reverse).' },
    ]} />

    {/* ============ Hooks ============ */}
    <Heading level={3}>Programmatic — breakpoint hooks</Heading>
    <Text>
      For logic that doesn't fit declaratively (conditional rendering, fetching different data,
      mounting different components), use the hooks directly.
    </Text>

    <Story
      title="useBreakpoint / useBreakpointDown / useBreakpointValue"
      code={`const bp = useBreakpoint();              // 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
const isMobile = useBreakpointDown('md'); // < 768px → true
const isDesktop = useBreakpointUp('lg');  // ≥ 1024px → true
const cols = useBreakpointValue({ base: 1, md: 2, lg: 4 });`}
    >
      <Text size="sm" tone="muted">
        All hooks listen to window resize, so they update live as the user drags the window edge.
      </Text>
    </Story>

    {/* ============ Choosing between patterns ============ */}
    <Heading level={3}>Which pattern should I use?</Heading>
    <PropsTable rows={[
      { prop: 'Modern grid', type: 'Grid + GridItem', description: 'Cleaner for symmetric layouts. Use when columns are uniform across the row.' },
      { prop: 'Bootstrap', type: 'Row + Col', description: 'Familiar to most devs. Better when each col has a unique span at each breakpoint.' },
      { prop: 'Stack', type: 'Stack/HStack/VStack', description: 'Linear layouts that flip orientation on breakpoint (sidebar → top bar).' },
      { prop: 'SimpleGrid', type: 'SimpleGrid', description: 'Fastest for "fit as many as you can" galleries — pass `minChildWidth`.' },
    ]} />
  </VStack>
);
