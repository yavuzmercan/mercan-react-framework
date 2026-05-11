import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../components/typography/Heading';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] },
    children: { control: 'text' },
  },
  args: { level: 2, children: 'Heading text' },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Playground: Story = {};

export const Levels: Story = {
  render: () => (
    <VStack gap="sm">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </VStack>
  ),
};
