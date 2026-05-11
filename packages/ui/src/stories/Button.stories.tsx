import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/forms/Button';
import { IconButton } from '../components/forms/IconButton';
import { HStack, VStack } from '../components/layout/Stack';
import { Heart, Plus, Download, Trash, Settings, ChevronRight, Bell } from '../icons';

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost', 'link'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    colorScheme: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <HStack gap="sm" wrap>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </HStack>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <VStack gap="sm">
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((c) => (
        <HStack key={c} gap="sm" wrap>
          <Button colorScheme={c}>solid</Button>
          <Button variant="outline" colorScheme={c}>outline</Button>
          <Button variant="ghost" colorScheme={c}>ghost</Button>
        </HStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap="sm" align="center">
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
    </HStack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <HStack gap="sm" wrap>
      <Button leftIcon={<Plus size={16} />}>Add</Button>
      <Button colorScheme="secondary" leftIcon={<Download size={16} />}>Download</Button>
      <Button colorScheme="danger" leftIcon={<Trash size={16} />}>Delete</Button>
      <Button variant="outline" rightIcon={<ChevronRight size={16} />}>Continue</Button>
    </HStack>
  ),
};

export const States: Story = {
  render: () => (
    <HStack gap="sm" wrap>
      <Button>default</Button>
      <Button loading>loading</Button>
      <Button disabled>disabled</Button>
    </HStack>
  ),
};

export const IconOnly: Story = {
  name: 'IconButton',
  render: () => (
    <HStack gap="sm" wrap>
      <IconButton aria-label="Like" icon={<Heart size={18} />} />
      <IconButton aria-label="Settings" variant="solid" colorScheme="primary" icon={<Settings size={18} />} />
      <IconButton aria-label="Notifications" variant="outline" icon={<Bell size={18} />} />
      <IconButton aria-label="Delete" variant="ghost" colorScheme="danger" icon={<Trash size={18} />} />
    </HStack>
  ),
};
