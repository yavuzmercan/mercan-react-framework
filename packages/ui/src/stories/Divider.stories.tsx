import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../components/layout/Divider';
import { HStack, VStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: { orientation: 'horizontal' },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <VStack gap="md">
      <Text>Above the line</Text>
      <Divider />
      <Text>Below the line</Text>
    </VStack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <HStack gap="md" align="center" style={{ height: 60 }}>
      <Text>Left</Text>
      <Divider orientation="vertical" />
      <Text>Middle</Text>
      <Divider orientation="vertical" />
      <Text>Right</Text>
    </HStack>
  ),
};
