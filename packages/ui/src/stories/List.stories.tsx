import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '../components/display/List';
import { Card } from '../components/display/Card';
import { Avatar } from '../components/display/Avatar';
import { Badge } from '../components/display/Badge';
import { HStack, VStack } from '../components/layout/Stack';
import { Spacer } from '../components/layout/Spacer';
import { Text } from '../components/typography/Text';
import { ChevronRight, Mail, User } from '../icons';

const meta: Meta<typeof List> = {
  title: 'Display/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    interactive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Basic: Story = {
  render: () => (
    <Card style={{ maxWidth: 480 }}>
      <List>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </List>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card style={{ maxWidth: 480 }}>
      <List interactive>
        <ListItem>
          <HStack align="center" gap="md">
            <Avatar name="Ada Lovelace" size="sm" />
            <VStack gap="none">
              <Text weight="medium">Ada Lovelace</Text>
              <Text tone="muted" size="sm">ada@example.com</Text>
            </VStack>
            <Spacer />
            <Badge colorScheme="primary">Admin</Badge>
            <ChevronRight size={16} color="var(--mf-color-textMuted)" />
          </HStack>
        </ListItem>
        <ListItem>
          <HStack align="center" gap="md">
            <Mail size={20} color="var(--mf-color-info)" />
            <VStack gap="none">
              <Text weight="medium">Inbox</Text>
              <Text tone="muted" size="sm">3 new messages</Text>
            </VStack>
            <Spacer />
            <Badge colorScheme="success">3</Badge>
            <ChevronRight size={16} color="var(--mf-color-textMuted)" />
          </HStack>
        </ListItem>
        <ListItem>
          <HStack align="center" gap="md">
            <User size={20} color="var(--mf-color-primary)" />
            <Text weight="medium">Profile</Text>
            <Spacer />
            <ChevronRight size={16} color="var(--mf-color-textMuted)" />
          </HStack>
        </ListItem>
      </List>
    </Card>
  ),
};
