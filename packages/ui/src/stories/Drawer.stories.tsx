import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../components/navigation/Drawer';
import { Button } from '../components/forms/Button';
import { Input } from '../components/forms/Input';
import { Switch } from '../components/forms/Switch';
import { FormField } from '../components/forms/FormField';
import { VStack, HStack } from '../components/layout/Stack';

const meta: Meta<typeof Drawer> = {
  title: 'Navigation/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const Demo = ({ side }: { side: 'left' | 'right' | 'top' | 'bottom' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {side} drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} side={side} title="Settings">
        <VStack gap="md">
          <FormField label="Display name">
            <Input placeholder="Ada Lovelace" />
          </FormField>
          <Switch label="Email notifications" defaultChecked />
          <Switch label="Marketing emails" />
          <Button onClick={() => setOpen(false)}>Save & close</Button>
        </VStack>
      </Drawer>
    </>
  );
};

export const Right: Story = { render: () => <Demo side="right" /> };
export const Left: Story = { render: () => <Demo side="left" /> };
export const Top: Story = { render: () => <Demo side="top" /> };
export const Bottom: Story = { render: () => <Demo side="bottom" /> };

export const AllSides: Story = {
  render: () => (
    <HStack gap="sm" wrap>
      <Demo side="left" />
      <Demo side="right" />
      <Demo side="top" />
      <Demo side="bottom" />
    </HStack>
  ),
};
