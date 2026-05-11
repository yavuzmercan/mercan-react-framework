import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from '../components/feedback/HoverCard';
import { Avatar } from '../components/display/Avatar';
import { Button } from '../components/forms/Button';
import { Heading } from '../components/typography/Heading';
import { Text } from '../components/typography/Text';
import { HStack, VStack } from '../components/layout/Stack';

const meta: Meta<typeof HoverCard> = {
  title: 'Feedback/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
    openDelay: { control: 'number' },
    closeDelay: { control: 'number' },
  },
  args: { placement: 'bottom', openDelay: 200, closeDelay: 150 },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Profile: Story = {
  render: (args) => (
    <HoverCard
      {...args}
      trigger={
        <HStack gap="sm" align="center" style={{ cursor: 'pointer' }}>
          <Avatar name="Ada Lovelace" size="sm" />
          <Text weight="medium">@ada</Text>
        </HStack>
      }
    >
      <VStack gap="sm" style={{ minWidth: 240 }}>
        <HStack gap="sm" align="center">
          <Avatar name="Ada Lovelace" />
          <VStack gap="none">
            <Heading level={6}>Ada Lovelace</Heading>
            <Text tone="muted" size="sm">Mathematician · Joined 1843</Text>
          </VStack>
        </HStack>
        <Text size="sm">Computing pioneer. The first programmer.</Text>
        <Button size="sm">Follow</Button>
      </VStack>
    </HoverCard>
  ),
};
