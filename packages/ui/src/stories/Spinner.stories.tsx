import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../components/display/Spinner';
import { HStack } from '../components/layout/Stack';

const meta: Meta<typeof Spinner> = {
  title: 'Display/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
  },
  args: { size: 'md', label: 'Loading' },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <HStack gap="md" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </HStack>
  ),
};
