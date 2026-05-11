import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../components/navigation/Breadcrumb';
import { HStack } from '../components/layout/Stack';
import { Home, ChevronRight } from '../icons';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Basic: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: <HStack gap="xs" align="center"><Home size={14} /> Home</HStack>, href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Navigation', href: '#' },
        { label: 'Breadcrumb' },
      ]}
    />
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb
      separator={<ChevronRight size={12} />}
      items={[
        { label: 'Docs', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Reference' },
      ]}
    />
  ),
};
