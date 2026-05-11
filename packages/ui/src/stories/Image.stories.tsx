import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '../components/display/Image';
import { HStack } from '../components/layout/Stack';

const meta: Meta<typeof Image> = {
  title: 'Display/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    rounded: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Variants: Story = {
  render: () => (
    <HStack gap="md" align="center">
      <Image src="https://picsum.photos/200" alt="square" width={120} height={120} />
      <Image rounded src="https://picsum.photos/200?random=2" alt="rounded square" width={120} height={120} />
      <Image
        rounded
        src="https://picsum.photos/200?random=3"
        alt="circle"
        width={120}
        height={120}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
    </HStack>
  ),
};
