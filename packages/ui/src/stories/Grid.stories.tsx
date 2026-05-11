import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem } from '../components/layout/Grid';
import { Box } from '../components/layout/Box';
import { Heading } from '../components/typography/Heading';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'CSS Grid wrapper. `columns` and `gap` accept a responsive object. Pair with `<GridItem>` for asymmetric layouts via `colSpan`/`rowSpan`/`colStart`/`colEnd`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Tile = ({ children }: { children: React.ReactNode }) => (
  <Box bg="surfaceAlt" radius="md" p="md" style={{ textAlign: 'center' }}>
    <Text weight="medium">{children}</Text>
  </Box>
);

export const ResponsiveColumns: Story = {
  render: () => (
    <VStack gap="sm">
      <Text tone="muted" size="sm"><code>columns=&#123; base: 1, sm: 2, md: 3, lg: 4 &#125;</code></Text>
      <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
        {Array.from({ length: 8 }).map((_, i) => <Tile key={i}>Tile {i + 1}</Tile>)}
      </Grid>
    </VStack>
  ),
};

export const Asymmetric: Story = {
  name: 'Asymmetric (GridItem)',
  render: () => (
    <Grid columns={{ base: 1, md: 4 }} gap="md">
      <GridItem colSpan={{ base: 1, md: 4 }}>
        <Box bg="surface" border radius="md" p="lg">
          <Heading level={6}>Hero — full width on md+</Heading>
        </Box>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}><Tile>colSpan 2</Tile></GridItem>
      <GridItem colSpan={{ base: 1, md: 1 }}><Tile>colSpan 1</Tile></GridItem>
      <GridItem colSpan={{ base: 1, md: 1 }}><Tile>colSpan 1</Tile></GridItem>
    </Grid>
  ),
};
