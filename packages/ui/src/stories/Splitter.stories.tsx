import type { Meta, StoryObj } from '@storybook/react';
import { Splitter } from '../components/navigation/Splitter';
import { Box } from '../components/layout/Box';
import { Heading } from '../components/typography/Heading';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Splitter> = {
  title: 'Navigation/Splitter',
  component: Splitter,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    defaultSize: { control: { type: 'range', min: 10, max: 90 } },
  },
  args: { direction: 'horizontal', defaultSize: 30 },
};

export default meta;
type Story = StoryObj<typeof Splitter>;

const Pane = ({ title, body }: { title: string; body: string }) => (
  <Box bg="surfaceAlt" p="md" style={{ height: '100%' }}>
    <VStack gap="sm">
      <Heading level={6}>{title}</Heading>
      <Text tone="muted" size="sm">{body}</Text>
    </VStack>
  </Box>
);

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ height: 320, border: '1px solid var(--mf-color-border)', borderRadius: 8 }}>
      <Splitter {...args}>
        <Pane title="Sidebar" body="Drag the divider →" />
        <Pane title="Main" body="Resizes when you drag" />
      </Splitter>
    </div>
  ),
};

export const Vertical: Story = {
  args: { direction: 'vertical', defaultSize: 40 },
  render: (args) => (
    <div style={{ height: 320, border: '1px solid var(--mf-color-border)', borderRadius: 8 }}>
      <Splitter {...args}>
        <Pane title="Top pane" body="Drag the divider ↓" />
        <Pane title="Bottom pane" body="Resizes when you drag" />
      </Splitter>
    </div>
  ),
};
