import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from '../components/display/Timeline';
import { Heading } from '../components/typography/Heading';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Timeline> = {
  title: 'Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Basic: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <VStack gap="none">
          <Heading level={6}>Order placed</Heading>
          <Text tone="muted" size="sm">2 hours ago</Text>
        </VStack>
      </TimelineItem>
      <TimelineItem dotColor="var(--mf-color-warning)">
        <VStack gap="none">
          <Heading level={6}>Payment received</Heading>
          <Text tone="muted" size="sm">1 hour ago</Text>
        </VStack>
      </TimelineItem>
      <TimelineItem dotColor="var(--mf-color-info)">
        <VStack gap="none">
          <Heading level={6}>Shipped</Heading>
          <Text tone="muted" size="sm">30 minutes ago</Text>
        </VStack>
      </TimelineItem>
      <TimelineItem dotColor="var(--mf-color-success)" isLast>
        <VStack gap="none">
          <Heading level={6}>Delivered</Heading>
          <Text tone="muted" size="sm">Just now</Text>
        </VStack>
      </TimelineItem>
    </Timeline>
  ),
};
