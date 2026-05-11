import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/display/Badge';
import { HStack } from '../components/layout/Stack';
import { Check, Star } from '../icons';

const meta: Meta<typeof Badge> = {
  title: 'Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    children: { control: 'text' },
  },
  args: { children: 'Badge', colorScheme: 'primary' },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const ColorSchemes: Story = {
  render: () => (
    <HStack gap="sm" wrap>
      <Badge colorScheme="primary">primary</Badge>
      <Badge colorScheme="secondary">secondary</Badge>
      <Badge colorScheme="success">success</Badge>
      <Badge colorScheme="warning">warning</Badge>
      <Badge colorScheme="danger">danger</Badge>
      <Badge colorScheme="info">info</Badge>
      <Badge colorScheme="neutral">neutral</Badge>
    </HStack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <HStack gap="sm" wrap>
      <Badge colorScheme="primary">
        <HStack gap="xs" align="center"><Star size={10} /> New</HStack>
      </Badge>
      <Badge colorScheme="success">
        <HStack gap="xs" align="center"><Check size={10} /> Active</HStack>
      </Badge>
    </HStack>
  ),
};
