import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from '../components/layout/Spacer';
import { HStack } from '../components/layout/Stack';
import { Heading } from '../components/typography/Heading';
import { Button } from '../components/forms/Button';

const meta: Meta<typeof Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Flex grow filler. Inside an HStack/VStack it pushes its siblings apart by absorbing all remaining space.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const PushApart: Story = {
  render: () => (
    <HStack gap="sm" align="center" style={{ width: 480, padding: 12, border: '1px solid var(--mf-color-border)', borderRadius: 8 }}>
      <Heading level={5}>Title</Heading>
      <Spacer />
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </HStack>
  ),
};
