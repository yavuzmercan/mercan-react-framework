import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionList } from '../components/display/DescriptionList';
import { Badge } from '../components/display/Badge';

const meta: Meta<typeof DescriptionList> = {
  title: 'Display/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const Basic: Story = {
  render: () => (
    <DescriptionList
      items={[
        { term: 'Plan', description: 'Pro' },
        { term: 'Status', description: <Badge colorScheme="success">Active</Badge> },
        { term: 'Member since', description: 'January 2024' },
        { term: 'Storage', description: '24 GB / 50 GB' },
      ]}
    />
  ),
};
