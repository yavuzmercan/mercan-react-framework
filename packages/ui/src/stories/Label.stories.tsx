import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../components/typography/Label';
import { Input } from '../components/forms/Input';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Label> = {
  title: 'Typography/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    children: { control: 'text' },
    htmlFor: { control: 'text' },
  },
  args: { children: 'Email address', htmlFor: 'email-1' },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  render: (args) => (
    <VStack gap="xs">
      <Label {...args} />
      <Input id="email-1" type="email" placeholder="you@example.com" />
    </VStack>
  ),
};

export const Required: Story = {
  render: () => (
    <VStack gap="xs">
      <Label htmlFor="name-1" required>Full name</Label>
      <Input id="name-1" placeholder="Ada Lovelace" />
    </VStack>
  ),
};
