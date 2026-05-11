import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../components/feedback/Tooltip';
import { Button } from '../components/forms/Button';
import { IconButton } from '../components/forms/IconButton';
import { HStack } from '../components/layout/Stack';
import { Settings, Heart } from '../icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
    label: { control: 'text' },
  },
  args: { label: 'Tooltip text', placement: 'top' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <HStack gap="md">
      <Tooltip label="Top tooltip" placement="top">
        <IconButton aria-label="top" icon={<Heart size={16} />} />
      </Tooltip>
      <Tooltip label="Bottom tooltip" placement="bottom">
        <IconButton aria-label="bottom" icon={<Heart size={16} />} />
      </Tooltip>
      <Tooltip label="Left tooltip" placement="left">
        <IconButton aria-label="left" icon={<Heart size={16} />} />
      </Tooltip>
      <Tooltip label="Right tooltip" placement="right">
        <IconButton aria-label="right" icon={<Settings size={16} />} />
      </Tooltip>
    </HStack>
  ),
};
