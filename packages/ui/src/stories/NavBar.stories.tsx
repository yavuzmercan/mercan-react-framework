import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../components/layout/NavBar';
import { Link } from '../components/navigation/Link';
import { Button } from '../components/forms/Button';
import { Heading } from '../components/typography/Heading';
import { HStack } from '../components/layout/Stack';

const meta: Meta<typeof NavBar> = {
  title: 'Layout/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Basic: Story = {
  render: () => (
    <NavBar
      brand={<Heading level={5}>Mercan UI</Heading>}
      actions={
        <HStack gap="sm">
          <Button variant="ghost">Sign in</Button>
          <Button>Get started</Button>
        </HStack>
      }
    >
      <Link href="#">Docs</Link>
      <Link href="#">Components</Link>
      <Link href="#">GitHub</Link>
    </NavBar>
  ),
};

export const Sticky: Story = {
  render: () => (
    <>
      <NavBar
        sticky
        brand={<Heading level={5}>Sticky</Heading>}
        actions={<Button size="sm">Action</Button>}
      >
        <Link href="#">One</Link>
        <Link href="#">Two</Link>
      </NavBar>
      <div style={{ height: 800, padding: 24 }}>Scroll me — the navbar stays put.</div>
    </>
  ),
};
