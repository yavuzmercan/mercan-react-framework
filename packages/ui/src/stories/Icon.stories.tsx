import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../components/display/Icon';
import { Bell, Heart, Settings, Star, Search, Mail } from '../icons';
import { HStack } from '../components/layout/Stack';

const meta: Meta<typeof Icon> = {
  title: 'Display/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Icon is a sized wrapper that gives any SVG (or arbitrary node) a consistent box. Use it when you need to align icons inside text or buttons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Sizes: Story = {
  render: () => (
    <HStack gap="md" align="center">
      <Icon size={12}><Star size={12} /></Icon>
      <Icon size={16}><Star size={16} /></Icon>
      <Icon size={20}><Star size={20} /></Icon>
      <Icon size={28}><Star size={28} /></Icon>
      <Icon size={40}><Star size={40} /></Icon>
    </HStack>
  ),
};

export const Library: Story = {
  name: 'Built-in icons (sample)',
  render: () => (
    <HStack gap="md" align="center" wrap>
      <Bell size={20} />
      <Heart size={20} />
      <Star size={20} />
      <Settings size={20} />
      <Search size={20} />
      <Mail size={20} />
    </HStack>
  ),
};
