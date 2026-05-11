import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/forms/Checkbox';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Subscribe to newsletter' },
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: () => {
    const [v, setV] = useState(true);
    return <Checkbox label={`Checked: ${v}`} checked={v} onChange={(e) => setV(e.target.checked)} />;
  },
};

export const States: Story = {
  render: () => (
    <VStack gap="sm">
      <Checkbox label="Default" />
      <Checkbox label="Default checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </VStack>
  ),
};
