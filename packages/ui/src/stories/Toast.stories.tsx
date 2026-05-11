import type { Meta, StoryObj } from '@storybook/react';
import { useToast } from '../components/feedback/Toast';
import { Button } from '../components/forms/Button';
import { HStack } from '../components/layout/Stack';
import { Check, XCircle } from '../icons';

const meta: Meta = {
  title: 'Feedback/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`useToast()` returns `{ show, dismiss }`. The provider is set up at the app root (Storybook preview wraps every story in `MercanProvider`, which mounts `ToastProvider`).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const Demo = () => {
  const toast = useToast();
  return (
    <HStack gap="sm" wrap>
      <Button onClick={() => toast.show({ title: 'Saved', status: 'success' })} leftIcon={<Check size={16} />}>
        Success
      </Button>
      <Button colorScheme="info" onClick={() => toast.show({ title: 'Heads up', message: 'Just so you know.', status: 'info' })}>
        Info
      </Button>
      <Button colorScheme="warning" onClick={() => toast.show({ title: 'Approaching limit', status: 'warning' })}>
        Warning
      </Button>
      <Button colorScheme="danger" onClick={() => toast.show({ title: 'Failed', message: 'Try again.', status: 'danger' })} leftIcon={<XCircle size={16} />}>
        Danger
      </Button>
      <Button variant="outline" onClick={() => toast.show({ title: 'Persistent (no auto-dismiss)', duration: 0 })}>
        Persistent
      </Button>
    </HStack>
  );
};

export const Triggers: Story = { render: () => <Demo /> };
