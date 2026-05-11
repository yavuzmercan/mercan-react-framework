import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from '../components/feedback/Banner';
import { Button } from '../components/forms/Button';
import { VStack } from '../components/layout/Stack';
import { Info, AlertTriangle, CheckCircle } from '../icons';

const meta: Meta<typeof Banner> = {
  title: 'Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] },
  },
  args: { status: 'primary' },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Playground: Story = {
  render: (args) => <Banner {...args}>Welcome to your dashboard.</Banner>,
};

export const Variants: Story = {
  render: () => {
    const [closed, setClosed] = useState(false);
    return (
      <VStack gap="sm">
        <Banner status="info" icon={<Info size={18} />}>
          New version available — refresh to update.
        </Banner>
        <Banner status="success" icon={<CheckCircle size={18} />} action={<Button size="sm" variant="ghost">Undo</Button>}>
          Changes saved successfully.
        </Banner>
        <Banner status="warning" icon={<AlertTriangle size={18} />}>
          Your trial ends in 3 days.
        </Banner>
        {!closed && (
          <Banner status="danger" onClose={() => setClosed(true)}>
            Connection lost. Reconnecting…
          </Banner>
        )}
      </VStack>
    );
  },
};
