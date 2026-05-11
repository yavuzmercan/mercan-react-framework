import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../components/layout/Footer';
import { Link } from '../components/navigation/Link';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Basic: Story = {
  render: () => (
    <Footer
      copyright={<Text tone="muted" size="sm">© 2026 Mercan UI</Text>}
      links={
        <>
          <Link href="#">Docs</Link>
          <Link href="#">GitHub</Link>
          <Link href="#" external>Discord</Link>
        </>
      }
    />
  ),
};
