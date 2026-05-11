import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../components/layout/Container';
import { Box } from '../components/layout/Box';
import { VStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
  args: { size: 'lg' },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Sizes: Story = {
  render: () => (
    <VStack gap="md">
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
        <Container key={s} size={s}>
          <Box bg="surfaceAlt" p="md" radius="md">
            <Text>size="{s}"</Text>
          </Box>
        </Container>
      ))}
    </VStack>
  ),
};
