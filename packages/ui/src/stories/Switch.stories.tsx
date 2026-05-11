import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/forms/Switch';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Enable notifications' },
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: () => {
    const [v, setV] = useState(true);
    return <Switch label={`Notifications: ${v ? 'on' : 'off'}`} checked={v} onChange={(e) => setV(e.target.checked)} />;
  },
};

export const States: Story = {
  render: () => (
    <VStack gap="sm">
      <Switch label="Default off" />
      <Switch label="Default on" defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </VStack>
  ),
};
