import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog } from '../components/feedback/ConfirmDialog';
import { Button } from '../components/forms/Button';
import { Trash } from '../icons';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const DangerConfirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
      <>
        <Button colorScheme="danger" leftIcon={<Trash size={16} />} onClick={() => setOpen(true)}>
          Delete account
        </Button>
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={async () => {
            setLoading(true);
            await new Promise((r) => setTimeout(r, 800));
            setLoading(false);
            setOpen(false);
          }}
          title="Delete account?"
          message="This will permanently delete your account and remove all your data. This action cannot be undone."
          confirmLabel="Yes, delete it"
          confirmColorScheme="danger"
          loading={loading}
        />
      </>
    );
  },
};

export const SimplePrompt: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Discard changes</Button>
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Discard unsaved changes?"
          message="Any edits you made will be lost."
          confirmLabel="Discard"
        />
      </>
    );
  },
};
