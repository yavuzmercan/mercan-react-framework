import type { Meta, StoryObj } from '@storybook/react';
import { Center } from '../components/layout/Center';
import { Box } from '../components/layout/Box';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Center> = {
  title: 'Layout/Center',
  component: Center,
  tags: ['autodocs'],
  argTypes: { inline: { control: 'boolean' } },
};

export default meta;
type Story = StoryObj<typeof Center>;

export const Block: Story = {
  render: () => (
    <Box bg="surfaceAlt" radius="md" style={{ height: 200 }}>
      <Center style={{ height: '100%' }}>
        <Text>Centered both ways</Text>
      </Center>
    </Box>
  ),
};

export const Inline: Story = {
  render: () => (
    <Text>
      Some text with{' '}
      <Center inline style={{ verticalAlign: 'middle', padding: '0 6px' }}>
        <span style={{ background: 'var(--mf-color-surfaceAlt)', padding: '2px 6px', borderRadius: 4 }}>
          inline center
        </span>
      </Center>{' '}
      in the middle.
    </Text>
  ),
};
