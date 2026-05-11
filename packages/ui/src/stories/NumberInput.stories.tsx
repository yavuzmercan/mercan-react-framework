import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '../components/forms/NumberInput';
import { FormField } from '../components/forms/FormField';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof NumberInput> = {
  title: 'Forms/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { min: 0, max: 100, step: 1 },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState<number | undefined>(10);
    return <NumberInput {...args} value={v} onChange={setV} />;
  },
};

export const WithBounds: Story = {
  render: () => {
    const [v, setV] = useState<number>(5);
    return (
      <FormField label={`Quantity (1-10): ${v}`}>
        <NumberInput value={v} min={1} max={10} onChange={setV} />
      </FormField>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [v, setV] = useState(10);
    return (
      <VStack gap="sm" style={{ maxWidth: 200 }}>
        <NumberInput size="sm" value={v} onChange={setV} />
        <NumberInput size="md" value={v} onChange={setV} />
        <NumberInput size="lg" value={v} onChange={setV} />
      </VStack>
    );
  },
};
