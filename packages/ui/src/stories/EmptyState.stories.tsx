import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../components/display/EmptyState';
import { Button } from '../components/forms/Button';
import { Mail, Plus } from '../icons';

const meta: Meta<typeof EmptyState> = {
  title: 'Display/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  render: () => (
    <EmptyState
      icon={<Mail size={40} color="var(--mf-color-textMuted)" />}
      title="No messages yet"
      description="When someone sends you a message, it'll appear here."
      action={<Button leftIcon={<Plus size={14} />}>Compose</Button>}
    />
  ),
};

export const Minimal: Story = {
  render: () => <EmptyState title="Nothing to see here." />,
};
