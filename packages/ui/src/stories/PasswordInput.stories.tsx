import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '../components/forms/PasswordInput';
import { FormField } from '../components/forms/FormField';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    hideToggle: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { defaultValue: 'super-secret-123', placeholder: 'Password' },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <VStack gap="sm" style={{ maxWidth: 320 }}>
      <FormField label="Default">
        <PasswordInput placeholder="Enter password" />
      </FormField>
      <FormField label="With value">
        <PasswordInput defaultValue="abc-123" />
      </FormField>
      <FormField label="No reveal toggle">
        <PasswordInput defaultValue="abc-123" hideToggle />
      </FormField>
      <FormField label="Invalid" errorText="Too short">
        <PasswordInput defaultValue="ab" invalid />
      </FormField>
    </VStack>
  ),
};
