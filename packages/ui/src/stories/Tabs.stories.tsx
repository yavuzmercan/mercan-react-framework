import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from '../components/navigation/Tabs';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="usage">Usage</Tab>
        <Tab value="api">API</Tab>
        <Tab value="changelog" disabled>Changelog</Tab>
      </TabList>
      <TabPanel value="overview">
        <Text tone="muted">Overview of the navigation primitives.</Text>
      </TabPanel>
      <TabPanel value="usage">
        <Text tone="muted">Examples of how to compose them.</Text>
      </TabPanel>
      <TabPanel value="api">
        <Text tone="muted">Detailed prop reference.</Text>
      </TabPanel>
    </Tabs>
  ),
};
