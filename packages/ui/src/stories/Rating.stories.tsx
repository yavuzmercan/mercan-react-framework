import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '../components/forms/Rating';
import { VStack, HStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Rating> = {
  title: 'Forms/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 3, max: 10 } },
    size: { control: { type: 'number', min: 12, max: 40 } },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { count: 5, size: 24, defaultValue: 3 },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: () => {
    const [v, setV] = useState(0);
    return (
      <VStack gap="sm">
        <Rating value={v} onChange={setV} />
        <Text tone="muted" size="sm">value: <code>{v}</code></Text>
      </VStack>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <VStack gap="md">
      <HStack gap="md" align="center">
        <Text style={{ width: 80 }}>Default</Text>
        <Rating defaultValue={3} />
      </HStack>
      <HStack gap="md" align="center">
        <Text style={{ width: 80 }}>10 stars</Text>
        <Rating defaultValue={7} count={10} size={18} />
      </HStack>
      <HStack gap="md" align="center">
        <Text style={{ width: 80 }}>Read-only</Text>
        <Rating defaultValue={4} readOnly />
      </HStack>
      <HStack gap="md" align="center">
        <Text style={{ width: 80 }}>Disabled</Text>
        <Rating defaultValue={3} disabled />
      </HStack>
    </VStack>
  ),
};
