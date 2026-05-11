import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../components/typography/Text';
import { VStack, HStack } from '../components/layout/Stack';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
    tone: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
    truncate: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { children: 'The quick brown fox jumps over the lazy dog.' },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <VStack gap="sm">
      <Text size="xs">size xs</Text>
      <Text size="sm">size sm</Text>
      <Text size="md">size md</Text>
      <Text size="lg">size lg</Text>
      <Text size="xl">size xl</Text>
    </VStack>
  ),
};

export const Weights: Story = {
  render: () => (
    <VStack gap="sm">
      <Text weight="regular">regular</Text>
      <Text weight="medium">medium</Text>
      <Text weight="semibold">semibold</Text>
      <Text weight="bold">bold</Text>
    </VStack>
  ),
};

export const Tones: Story = {
  render: () => (
    <HStack gap="md" wrap>
      <Text tone="default">default</Text>
      <Text tone="muted">muted</Text>
      <Text tone="primary">primary</Text>
      <Text tone="success">success</Text>
      <Text tone="warning">warning</Text>
      <Text tone="danger">danger</Text>
      <Text tone="info">info</Text>
    </HStack>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Text truncate>
        This is a very long line of text that overflows the parent and gets ellipsized when truncate is on.
      </Text>
    </div>
  ),
};
