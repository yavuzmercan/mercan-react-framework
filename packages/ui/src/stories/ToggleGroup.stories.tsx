import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleButton } from '../components/forms/ToggleGroup';
import { VStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Forms/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  render: () => {
    const [v, setV] = useState<string | string[]>('grid');
    return (
      <VStack gap="sm">
        <ToggleGroup value={v} onChange={setV}>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="board">Board</ToggleButton>
        </ToggleGroup>
        <Text tone="muted" size="sm">value: <code>{String(v)}</code></Text>
      </VStack>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [v, setV] = useState<string | string[]>(['react', 'ts']);
    return (
      <VStack gap="sm">
        <ToggleGroup multiple value={v} onChange={setV}>
          <ToggleButton value="react">React</ToggleButton>
          <ToggleButton value="ts">TypeScript</ToggleButton>
          <ToggleButton value="design">Design</ToggleButton>
          <ToggleButton value="a11y">A11y</ToggleButton>
        </ToggleGroup>
        <Text tone="muted" size="sm">value: <code>{JSON.stringify(v)}</code></Text>
      </VStack>
    );
  },
};
