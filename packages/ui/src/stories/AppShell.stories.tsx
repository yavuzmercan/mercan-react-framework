import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from '../components/layout/AppShell';
import { NavBar } from '../components/layout/NavBar';
import { Footer } from '../components/layout/Footer';
import { Box } from '../components/layout/Box';
import { Link } from '../components/navigation/Link';
import { List, ListItem } from '../components/display/List';
import { Heading } from '../components/typography/Heading';
import { Text } from '../components/typography/Text';
import { Button } from '../components/forms/Button';
import { HStack, VStack } from '../components/layout/Stack';

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

const Sidebar = () => (
  <Box p="md">
    <List>
      <ListItem><Link href="#">Dashboard</Link></ListItem>
      <ListItem><Link href="#">Projects</Link></ListItem>
      <ListItem><Link href="#">Team</Link></ListItem>
      <ListItem><Link href="#">Settings</Link></ListItem>
    </List>
  </Box>
);

const TopBar = () => (
  <NavBar
    brand={<Heading level={5}>Acme Inc</Heading>}
    actions={
      <HStack gap="sm">
        <Button variant="ghost">Help</Button>
        <Button>New project</Button>
      </HStack>
    }
  />
);

export const Full: Story = {
  render: () => (
    <AppShell
      navbar={<TopBar />}
      sidebar={<Sidebar />}
      footer={<Footer copyright={<Text tone="muted" size="sm">© Acme 2026</Text>} />}
    >
      <Box p="xl">
        <VStack gap="md">
          <Heading level={3}>Dashboard</Heading>
          <Text tone="muted">Main content area inside the shell.</Text>
        </VStack>
      </Box>
    </AppShell>
  ),
};

export const NoSidebar: Story = {
  render: () => (
    <AppShell navbar={<TopBar />}>
      <Box p="xl"><Text>No sidebar — the main content fills the row.</Text></Box>
    </AppShell>
  ),
};
