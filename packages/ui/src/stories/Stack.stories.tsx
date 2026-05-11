import type { Meta, StoryObj } from '@storybook/react';
import { Stack, HStack, VStack } from '../components/layout/Stack';
import { Box } from '../components/layout/Box';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column'] },
    gap: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    justify: { control: 'select', options: [undefined, 'start', 'center', 'end', 'between', 'around'] },
    align: { control: 'select', options: [undefined, 'start', 'center', 'end', 'stretch'] },
    wrap: { control: 'boolean' },
  },
  args: { direction: 'row', gap: 'md' },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Tile = ({ i }: { i: number }) => (
  <Box bg="surfaceAlt" p="md" radius="md"><Text>Item {i}</Text></Box>
);

export const Playground: Story = {
  render: (args) => (
    <Stack {...args}>
      <Tile i={1} /><Tile i={2} /><Tile i={3} />
    </Stack>
  ),
};

export const Aliases: Story = {
  name: 'HStack & VStack',
  render: () => (
    <VStack gap="md">
      <Text tone="muted" size="sm">HStack — direction="row"</Text>
      <HStack gap="sm">
        <Tile i={1} /><Tile i={2} /><Tile i={3} />
      </HStack>
      <Text tone="muted" size="sm">VStack — direction="column"</Text>
      <VStack gap="sm">
        <Tile i={1} /><Tile i={2} /><Tile i={3} />
      </VStack>
    </VStack>
  ),
};

export const ResponsiveDirection: Story = {
  render: () => (
    <VStack gap="sm">
      <Text tone="muted" size="sm">
        <code>direction=&#123; base: 'column', md: 'row' &#125;</code>
      </Text>
      <Stack direction={{ base: 'column', md: 'row' }} gap="md">
        <Box bg="surfaceAlt" p="md" radius="md" style={{ flex: 1 }}><Text>Pane A</Text></Box>
        <Box bg="surfaceAlt" p="md" radius="md" style={{ flex: 1 }}><Text>Pane B</Text></Box>
        <Box bg="surfaceAlt" p="md" radius="md" style={{ flex: 1 }}><Text>Pane C</Text></Box>
      </Stack>
    </VStack>
  ),
};
