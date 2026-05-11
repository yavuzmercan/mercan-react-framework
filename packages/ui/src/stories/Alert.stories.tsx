import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../components/feedback/Alert';
import { VStack } from '../components/layout/Stack';
import { Info, CheckCircle, AlertTriangle, XCircle } from '../icons';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
  },
  args: { status: 'info', title: 'Heads up', children: 'An informational message.' },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  render: () => (
    <VStack gap="md">
      <Alert status="info" title="Heads up" icon={<Info size={20} />}>An informational message.</Alert>
      <Alert status="success" title="Saved" icon={<CheckCircle size={20} />}>Your changes have been stored.</Alert>
      <Alert status="warning" title="Quota" icon={<AlertTriangle size={20} />}>You are using 80% of your quota.</Alert>
      <Alert status="danger" title="Error" icon={<XCircle size={20} />}>Something went wrong.</Alert>
    </VStack>
  ),
};
