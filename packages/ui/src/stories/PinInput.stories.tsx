import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PinInput } from '../components/forms/PinInput';
import { FormField } from '../components/forms/FormField';
import { VStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof PinInput> = {
  title: 'Forms/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 3, max: 8 } },
    type: { control: 'inline-radio', options: ['numeric', 'alphanumeric'] },
    mask: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { length: 6, type: 'numeric' },
};

export default meta;
type Story = StoryObj<typeof PinInput>;

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState('');
    return (
      <VStack gap="sm">
        <PinInput {...args} value={v} onChange={setV} />
        <Text tone="muted" size="sm">value: <code>{v || '∅'}</code></Text>
      </VStack>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <VStack gap="md">
      <FormField label="6-digit OTP">
        <PinInput length={6} type="numeric" />
      </FormField>
      <FormField label="4-digit PIN, masked">
        <PinInput length={4} type="numeric" mask />
      </FormField>
      <FormField label="Alphanumeric code">
        <PinInput length={5} type="alphanumeric" />
      </FormField>
    </VStack>
  ),
};
