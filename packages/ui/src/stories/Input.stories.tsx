import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/forms/Input';
import { TextArea } from '../components/forms/TextArea';
import { FormField } from '../components/forms/FormField';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: { control: 'inline-radio', options: ['text', 'email', 'password', 'number'] },
  },
  args: {
    placeholder: 'Type something…',
    type: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: () => {
    const [v, setV] = useState('Ada Lovelace');
    return (
      <VStack gap="sm">
        <Input value={v} onChange={(e) => setV(e.target.value)} />
        <span style={{ fontSize: 12, color: 'var(--mf-color-textMuted)' }}>
          Current value: <code>{v}</code>
        </span>
      </VStack>
    );
  },
};

export const States: Story = {
  render: () => (
    <VStack gap="sm">
      <Input placeholder="Default" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" invalid defaultValue="not-an-email" />
    </VStack>
  ),
};

export const InsideFormField: Story = {
  name: 'Inside FormField',
  render: () => (
    <VStack gap="md" style={{ maxWidth: 360 }}>
      <FormField label="Email" required helpText="We never share your email.">
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <FormField label="Password" errorText="At least 8 characters.">
        <Input type="password" defaultValue="abc" />
      </FormField>
      <FormField label="Bio" helpText="Markdown supported.">
        <TextArea placeholder="Tell us about yourself…" />
      </FormField>
    </VStack>
  ),
};
