import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components/display/Skeleton';
import { VStack, HStack } from '../components/layout/Stack';
import { Card, CardBody } from '../components/display/Card';

const meta: Meta<typeof Skeleton> = {
  title: 'Display/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    circle: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'number' },
  },
  args: { width: '100%', height: 16 },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const ProfileLoader: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardBody>
        <HStack gap="md" align="center">
          <Skeleton circle width={48} />
          <VStack gap="sm" style={{ flex: 1 }}>
            <Skeleton width="60%" height={14} />
            <Skeleton width="40%" height={12} />
          </VStack>
        </HStack>
        <VStack gap="sm" style={{ marginTop: 16 }}>
          <Skeleton height={12} />
          <Skeleton height={12} width="80%" />
          <Skeleton height={12} width="65%" />
        </VStack>
      </CardBody>
    </Card>
  ),
};
