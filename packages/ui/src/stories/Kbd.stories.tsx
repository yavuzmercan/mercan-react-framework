import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '../components/display/Kbd';
import { Text } from '../components/typography/Text';
import { HStack } from '../components/layout/Stack';

const meta: Meta<typeof Kbd> = {
  title: 'Display/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: { children: '⌘K' },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Playground: Story = {};

export const InProse: Story = {
  render: () => (
    <Text>
      Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette, or <Kbd>Esc</Kbd> to close.
    </Text>
  ),
};

export const Sequence: Story = {
  render: () => (
    <HStack gap="xs">
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>Shift</Kbd>
      <span>+</span>
      <Kbd>P</Kbd>
    </HStack>
  ),
};
