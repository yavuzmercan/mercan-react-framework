import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../components/feedback/Popover';
import { Button } from '../components/forms/Button';
import { Heading } from '../components/typography/Heading';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Popover> = {
  title: 'Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom'] },
  },
  args: { placement: 'bottom' },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: (args) => (
    <Popover
      {...args}
      trigger={<Button variant="outline">Open popover</Button>}
    >
      <VStack gap="sm" style={{ minWidth: 220 }}>
        <Heading level={6}>Pop content</Heading>
        <Text tone="muted" size="sm">A floating panel with arbitrary content.</Text>
        <Button size="sm">Action</Button>
      </VStack>
    </Popover>
  ),
};
