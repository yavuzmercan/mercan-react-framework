import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '../components/layout/AspectRatio';
import { HStack } from '../components/layout/Stack';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: 'number' },
  },
  args: { ratio: 16 / 9 },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

const ImgFill = ({ src }: { src: string }) => (
  <img
    src={src}
    alt=""
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
  />
);

export const Sixteen9: Story = {
  name: '16:9',
  render: () => (
    <div style={{ width: 480, position: 'relative' }}>
      <AspectRatio ratio={16 / 9} style={{ position: 'relative' }}>
        <ImgFill src="https://picsum.photos/640/360" />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <HStack gap="md">
      {[1, 4 / 3, 21 / 9].map((r, i) => (
        <div key={i} style={{ width: 200, position: 'relative' }}>
          <AspectRatio ratio={r} style={{ position: 'relative' }}>
            <ImgFill src={`https://picsum.photos/seed/${i}/400/400`} />
          </AspectRatio>
        </div>
      ))}
    </HStack>
  ),
};
