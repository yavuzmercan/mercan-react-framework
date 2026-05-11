import type { Meta, StoryObj } from '@storybook/react';
import { Highlight } from '../components/display/Highlight';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Highlight> = {
  title: 'Display/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    children: { control: 'text' },
  },
  args: { children: 'highlighted text' },
};

export default meta;
type Story = StoryObj<typeof Highlight>;

export const Playground: Story = {};

export const InProse: Story = {
  render: () => (
    <VStack gap="sm" style={{ maxWidth: 480 }}>
      <Text>
        Search results for <Highlight>react</Highlight> show that <Highlight colorScheme="success">test passed</Highlight> while <Highlight colorScheme="danger">build failed</Highlight>.
      </Text>
    </VStack>
  ),
};
