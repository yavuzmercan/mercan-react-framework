import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuItem, MenuDivider } from '../components/navigation/Menu';
import { Button } from '../components/forms/Button';
import { HStack } from '../components/layout/Stack';
import { MenuIcon, User, Settings, XCircle, Plus, Download } from '../icons';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  render: () => (
    <Menu trigger={<Button variant="outline" leftIcon={<MenuIcon size={16} />}>Menu</Button>}>
      <MenuItem onClick={() => console.log('profile')}>
        <HStack gap="sm" align="center"><User size={14} /> Profile</HStack>
      </MenuItem>
      <MenuItem onClick={() => console.log('settings')}>
        <HStack gap="sm" align="center"><Settings size={14} /> Settings</HStack>
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={() => console.log('logout')}>
        <HStack gap="sm" align="center"><XCircle size={14} /> Logout</HStack>
      </MenuItem>
    </Menu>
  ),
};

export const RightAligned: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', justifyContent: 'flex-end' }}>
      <Menu align="right" trigger={<Button>Actions ▾</Button>}>
        <MenuItem onClick={() => console.log('add')}>
          <HStack gap="sm" align="center"><Plus size={14} /> Add new</HStack>
        </MenuItem>
        <MenuItem onClick={() => console.log('download')}>
          <HStack gap="sm" align="center"><Download size={14} /> Download CSV</HStack>
        </MenuItem>
      </Menu>
    </div>
  ),
};
