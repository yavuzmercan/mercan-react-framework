import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../components/layout/Box';
import { VStack, HStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    p: { control: 'inline-radio', options: [undefined, 'sm', 'md', 'lg', 'xl'] },
    bg: { control: 'inline-radio', options: [undefined, 'background', 'surface', 'surfaceAlt'] },
    radius: { control: 'inline-radio', options: [undefined, 'sm', 'md', 'lg', 'full'] },
    border: { control: 'boolean' },
    shadow: { control: 'inline-radio', options: [undefined, 'sm', 'md', 'lg', 'xl'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Polymorphic layout primitive. Use the `as` prop to render any element/component while keeping spacing, background, radius, border, and shadow shortcuts.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Playground: Story = {
  args: { p: 'lg', bg: 'surfaceAlt', radius: 'md', border: true },
  render: (args) => (
    <Box {...args}>
      <Text>Tweak the controls — padding, background, radius, border, and shadow are all token-driven.</Text>
    </Box>
  ),
};

export const Backgrounds: Story = {
  render: () => (
    <HStack gap="md" wrap>
      <Box p="lg" bg="background" border>background</Box>
      <Box p="lg" bg="surface" border>surface</Box>
      <Box p="lg" bg="surfaceAlt" border>surfaceAlt</Box>
    </HStack>
  ),
};

export const Shadows: Story = {
  render: () => (
    <HStack gap="md" wrap>
      <Box p="lg" bg="surface" radius="md" shadow="sm">sm</Box>
      <Box p="lg" bg="surface" radius="md" shadow="md">md</Box>
      <Box p="lg" bg="surface" radius="md" shadow="lg">lg</Box>
      <Box p="lg" bg="surface" radius="md" shadow="xl">xl</Box>
    </HStack>
  ),
};

export const Polymorphic: Story = {
  name: 'Polymorphic (as)',
  render: () => (
    <VStack gap="sm">
      <Box as="section" p="md" bg="surfaceAlt" radius="md">section</Box>
      <Box as="article" p="md" bg="surfaceAlt" radius="md">article</Box>
      <Box as="aside" p="md" bg="surfaceAlt" radius="md">aside</Box>
    </VStack>
  ),
};
