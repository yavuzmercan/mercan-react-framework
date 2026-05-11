import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/navigation/Pagination';
import { VStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    pageCount: { control: { type: 'number', min: 1, max: 100 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
  },
  args: { pageCount: 12, siblingCount: 1 },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(3);
    return (
      <VStack gap="sm">
        <Text tone="muted" size="sm">Current page: {page}</Text>
        <Pagination {...args} page={page} onChange={setPage} />
      </VStack>
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(50);
    return <Pagination page={page} pageCount={100} onChange={setPage} />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return <Pagination page={page} pageCount={5} onChange={setPage} />;
  },
};
