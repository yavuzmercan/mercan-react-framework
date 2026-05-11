import type { Meta, StoryObj } from '@storybook/react';
import { SimpleGrid } from '../components/layout/SimpleGrid';
import { Box } from '../components/layout/Box';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof SimpleGrid> = {
  title: 'Layout/SimpleGrid',
  component: SimpleGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Equal-column grid. Use `columns` for a fixed count or `minChildWidth` for auto-fit. Both accept a responsive object.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleGrid>;

const Tile = ({ i }: { i: number }) => (
  <Box bg="surfaceAlt" p="md" radius="md" style={{ textAlign: 'center' }}>
    <Text>Tile {i + 1}</Text>
  </Box>
);

export const FixedColumns: Story = {
  render: () => (
    <VStack gap="sm">
      <Text tone="muted" size="sm"><code>columns=&#123; base: 1, sm: 2, md: 3, lg: 4 &#125;</code></Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
        {Array.from({ length: 8 }).map((_, i) => <Tile key={i} i={i} />)}
      </SimpleGrid>
    </VStack>
  ),
};

export const MinChildWidth: Story = {
  name: 'Auto-fit (minChildWidth)',
  render: () => (
    <VStack gap="sm">
      <Text tone="muted" size="sm"><code>minChildWidth=&#123; base: 140, md: 220 &#125;</code></Text>
      <SimpleGrid minChildWidth={{ base: 140, md: 220 }} gap="md">
        {Array.from({ length: 8 }).map((_, i) => <Tile key={i} i={i} />)}
      </SimpleGrid>
    </VStack>
  ),
};
