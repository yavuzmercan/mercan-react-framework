import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/feedback/Modal';
import { Button } from '../components/forms/Button';
import { Text } from '../components/typography/Text';
import { HStack } from '../components/layout/Stack';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    closeOnOverlay: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    hideCloseButton: { control: 'boolean' },
  },
  args: { size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Modal title"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </>
          }
        >
          <Text>Press Esc, click outside, or use a footer button to close.</Text>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
    return (
      <>
        <HStack gap="sm">
          <Button onClick={() => setSize('sm')}>sm</Button>
          <Button onClick={() => setSize('md')}>md</Button>
          <Button onClick={() => setSize('lg')}>lg</Button>
          <Button onClick={() => setSize('xl')}>xl</Button>
        </HStack>
        {size && (
          <Modal isOpen onClose={() => setSize(null)} title={`Size: ${size}`} size={size}>
            <Text>The modal grows to its size token's max-width.</Text>
          </Modal>
        )}
      </>
    );
  },
};
