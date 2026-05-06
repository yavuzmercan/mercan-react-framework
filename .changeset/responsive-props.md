---
"@yavuzmercan/ui": minor
---

feat: responsive props and a 12-column `Row` / `Col` system

Two complementary layout patterns now ship side-by-side:

### 1. Responsive object on existing layout components

`Grid`, `SimpleGrid`, and `Stack` (+ `HStack`/`VStack`) accept a per-breakpoint object on their key props. No new components needed for symmetric layouts.

```tsx
<Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: 'sm', md: 'md' }}>
  {tiles}
</Grid>

<Stack direction={{ base: 'column', md: 'row' }} gap="md">
  <Sidebar /> <Main />
</Stack>

<SimpleGrid minChildWidth={{ base: 140, md: 200 }} gap="md">
  {cards}
</SimpleGrid>
```

### 2. New `GridItem` for asymmetric grid layouts

```tsx
<Grid columns={{ base: 1, md: 4 }} gap="md">
  <GridItem colSpan={{ base: 1, md: 4 }}><Hero /></GridItem>
  <GridItem colSpan={{ base: 1, md: 2 }}><Card /></GridItem>
  <GridItem colSpan={{ base: 1, md: 1 }}><Card /></GridItem>
</Grid>
```

Accepts `colSpan` (number or `'full'`), `rowSpan`, `colStart`, `colEnd`, `rowStart`, `rowEnd` — all responsive.

### 3. New `Row` + `Col` — Bootstrap-style 12-grid

For developers coming from Bootstrap, MUI Grid, Antd. Each `Col` takes a base `span` (1–12, `'auto'`, or `'fill'`) and per-breakpoint overrides:

```tsx
<Row gutter="md">
  <Col span={12} md={6} lg={4}>A</Col>
  <Col span={12} md={6} lg={4}>B</Col>
  <Col span={12} md={12} lg={4}>C</Col>
</Row>

// Sidebar pattern with offset
<Row gutter="md">
  <Col span={12} md={4} lg={3}><Sidebar /></Col>
  <Col span={12} md={8} lg={9}><Main /></Col>
</Row>

// Auto + fill — flex-style
<Row gutter="md" align="center">
  <Col span="auto"><Avatar /></Col>
  <Col span="fill"><Title /></Col>
  <Col span="auto"><Action /></Col>
</Row>
```

`Col` also supports `offset` (left margin in 12-grid units) and `order`.

### 4. New: `useResponsiveValue` and `ResponsiveValue<T>` type

For your own components:

```tsx
import { useResponsiveValue, type ResponsiveValue } from '@yavuzmercan/ui';

interface Props {
  size?: ResponsiveValue<'sm' | 'md' | 'lg'>;
}

const MyComponent = ({ size }: Props) => {
  const resolved = useResponsiveValue(size);  // 'sm' | 'md' | 'lg' | undefined
  return <div data-size={resolved} />;
};
```

Plain values pass through unchanged; objects are resolved against the active breakpoint with sensible fallback to lower breakpoints.
