import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components/display/Avatar';
import { AvatarGroup } from '../components/display/AvatarGroup';
import { HStack, VStack } from '../components/layout/Stack';

const meta: Meta<typeof Avatar> = {
  title: 'Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    name: { control: 'text' },
    src: { control: 'text' },
  },
  args: { name: 'Ada Lovelace', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <HStack gap="md" align="center">
      <Avatar size="sm" name="Ada Lovelace" />
      <Avatar size="md" name="Linus Torvalds" />
      <Avatar size="lg" name="Grace Hopper" />
      <Avatar size="xl" name="Alan Turing" />
    </HStack>
  ),
};

export const FromImage: Story = {
  name: 'From image (with fallback)',
  render: () => (
    <HStack gap="md" align="center">
      <Avatar src="https://i.pravatar.cc/120?img=12" alt="Random user" />
      <Avatar src="broken-url" name="Fallback Initials" />
    </HStack>
  ),
};

export const Group: Story = {
  name: 'AvatarGroup',
  render: () => (
    <VStack gap="md">
      <AvatarGroup>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Linus Torvalds" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
      </AvatarGroup>
      <AvatarGroup max={3}>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Linus Torvalds" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Alan Turing" />
        <Avatar name="Margaret Hamilton" />
        <Avatar name="Donald Knuth" />
      </AvatarGroup>
    </VStack>
  ),
};
