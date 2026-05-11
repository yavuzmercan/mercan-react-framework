import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../components/navigation/Link';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof Link> = {
  title: 'Navigation/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'muted'] },
    external: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { children: 'documentation', href: '#', tone: 'default' },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <VStack gap="sm">
      <Text>Read the <Link href="#">documentation</Link> for full details.</Text>
      <Text>Or browse <Link href="https://example.com" external>the live demo</Link> on a separate tab.</Text>
      <Text tone="muted">Powered by <Link href="#" tone="muted">Mercan UI</Link>.</Text>
    </VStack>
  ),
};
