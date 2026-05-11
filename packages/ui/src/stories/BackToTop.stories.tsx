import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from '../components/navigation/BackToTop';
import { Text } from '../components/typography/Text';
import { VStack } from '../components/layout/Stack';

const meta: Meta<typeof BackToTop> = {
  title: 'Navigation/BackToTop',
  component: BackToTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Floating button that appears once the page is scrolled past `threshold` (default 300px). Smoothly scrolls back to top when clicked.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackToTop>;

export const Demo: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <VStack gap="md">
        <Text>Scroll the iframe down ~300px to make the BackToTop button appear in the bottom-right corner.</Text>
        {Array.from({ length: 30 }).map((_, i) => (
          <Text key={i} tone="muted">Filler line {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        ))}
      </VStack>
      <BackToTop />
    </div>
  ),
};
