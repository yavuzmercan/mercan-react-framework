import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../components/display/Progress';
import { VStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Progress> = {
  title: 'Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    indeterminate: { control: 'boolean' },
  },
  args: { value: 60, max: 100 },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Progress {...args} />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    const [v, setV] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setV((x) => (x >= 100 ? 0 : x + 5)), 200);
      return () => clearInterval(t);
    }, []);
    return (
      <VStack gap="sm" style={{ width: 320 }}>
        <Text tone="muted" size="sm">Counts up automatically</Text>
        <Progress value={v} />
      </VStack>
    );
  },
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Progress indeterminate />
    </div>
  ),
};
