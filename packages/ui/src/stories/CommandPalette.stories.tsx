import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette, type CommandItem } from '../components/navigation/CommandPalette';
import { Button } from '../components/forms/Button';
import { VStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';
import { Kbd } from '../components/display/Kbd';
import { Search, Settings, User, Mail, Plus, Sun, Moon, Home } from '../icons';

const meta: Meta<typeof CommandPalette> = {
  title: 'Navigation/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Cmd+K-style command palette with grouped items, fuzzy filter, keyboard navigation (arrows + Enter), and shortcut hints. Render under any trigger.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

const ITEMS: CommandItem[] = [
  { id: 'home', label: 'Go to home', icon: <Home size={14} />, shortcut: ['G', 'H'], group: 'Navigation', onSelect: () => console.log('home') },
  { id: 'inbox', label: 'Open inbox', icon: <Mail size={14} />, shortcut: ['G', 'I'], group: 'Navigation', onSelect: () => console.log('inbox') },
  { id: 'profile', label: 'Profile', icon: <User size={14} />, group: 'Navigation', onSelect: () => console.log('profile') },
  { id: 'settings', label: 'Settings', icon: <Settings size={14} />, shortcut: ['⌘', ','], group: 'Navigation', onSelect: () => console.log('settings') },
  { id: 'new', label: 'Create new…', description: 'Opens the create dialog', icon: <Plus size={14} />, shortcut: ['⌘', 'N'], group: 'Actions', onSelect: () => console.log('new') },
  { id: 'search', label: 'Search anything', icon: <Search size={14} />, shortcut: ['⌘', 'F'], group: 'Actions', onSelect: () => console.log('search') },
  { id: 'light', label: 'Switch to light theme', icon: <Sun size={14} />, group: 'Theme', onSelect: () => console.log('light') },
  { id: 'dark', label: 'Switch to dark theme', icon: <Moon size={14} />, group: 'Theme', onSelect: () => console.log('dark') },
];

export const Demo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <VStack gap="md" align="center">
        <Text tone="muted">Click below or press <Kbd>⌘</Kbd>+<Kbd>K</Kbd> in a real app.</Text>
        <Button onClick={() => setOpen(true)} leftIcon={<Search size={16} />}>
          Open command palette
        </Button>
        <CommandPalette isOpen={open} onClose={() => setOpen(false)} items={ITEMS} />
      </VStack>
    );
  },
};
