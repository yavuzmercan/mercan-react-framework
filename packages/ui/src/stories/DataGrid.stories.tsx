import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid, type DataGridColumn } from '../components/display/DataGrid';
import { Avatar } from '../components/display/Avatar';
import { Badge } from '../components/display/Badge';
import { HStack, VStack } from '../components/layout/Stack';
import { Text } from '../components/typography/Text';

interface Row {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'pending' | 'inactive';
  createdAt: Date;
}

const ROWS: Row[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin', status: 'active', createdAt: new Date(2023, 1, 14) },
  { id: 2, name: 'Linus Torvalds', email: 'linus@example.com', role: 'Admin', status: 'active', createdAt: new Date(2022, 8, 3) },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor', status: 'active', createdAt: new Date(2024, 0, 22) },
  { id: 4, name: 'Alan Turing', email: 'alan@example.com', role: 'Editor', status: 'pending', createdAt: new Date(2025, 5, 8) },
  { id: 5, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Viewer', status: 'active', createdAt: new Date(2024, 3, 17) },
  { id: 6, name: 'Donald Knuth', email: 'don@example.com', role: 'Viewer', status: 'inactive', createdAt: new Date(2021, 11, 30) },
  { id: 7, name: 'Edsger Dijkstra', email: 'edsger@example.com', role: 'Editor', status: 'active', createdAt: new Date(2023, 6, 4) },
  { id: 8, name: 'Barbara Liskov', email: 'barbara@example.com', role: 'Admin', status: 'active', createdAt: new Date(2024, 9, 11) },
  { id: 9, name: 'John Carmack', email: 'john@example.com', role: 'Viewer', status: 'pending', createdAt: new Date(2025, 2, 19) },
  { id: 10, name: 'Anders Hejlsberg', email: 'anders@example.com', role: 'Editor', status: 'active', createdAt: new Date(2023, 4, 25) },
];

const STATUS_SCHEME: Record<Row['status'], 'success' | 'warning' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
};

const RICH_COLUMNS: DataGridColumn<Row>[] = [
  {
    key: 'name',
    header: 'User',
    sortable: true,
    cell: (r) => (
      <HStack gap="sm" align="center">
        <Avatar name={r.name} size="sm" />
        <VStack gap="none">
          <Text weight="medium" size="sm">{r.name}</Text>
          <Text tone="muted" size="xs">{r.email}</Text>
        </VStack>
      </HStack>
    ),
  },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    cell: (r) => <Badge colorScheme={STATUS_SCHEME[r.status]}>{r.status}</Badge>,
  },
  {
    key: 'createdAt',
    header: 'Joined',
    sortable: true,
    sortAccessor: (r) => r.createdAt,
    cell: (r) => r.createdAt.toLocaleDateString(),
    align: 'right',
  },
];

const meta: Meta<typeof DataGrid<Row>> = {
  title: 'Display/DataGrid',
  component: DataGrid<Row>,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid<Row>>;

export const Sortable: Story = {
  render: () => (
    <DataGrid<Row>
      data={ROWS}
      columns={RICH_COLUMNS}
      rowKey={(r) => r.id}
      defaultSort={{ key: 'name', direction: 'asc' }}
      striped
    />
  ),
};

export const Paginated: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <DataGrid<Row>
        data={ROWS}
        columns={RICH_COLUMNS}
        rowKey={(r) => r.id}
        pagination={{ pageSize: 4, page, onPageChange: setPage }}
      />
    );
  },
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<Array<string | number>>([]);
    return (
      <VStack gap="sm">
        <Text tone="muted" size="sm">
          {selected.length === 0 ? 'No selection' : `${selected.length} row(s) selected`}
        </Text>
        <DataGrid<Row>
          data={ROWS}
          columns={RICH_COLUMNS}
          rowKey={(r) => r.id}
          selectable="multiple"
          selected={selected}
          onSelectionChange={setSelected}
          striped
        />
      </VStack>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <DataGrid<Row>
      data={[]}
      columns={RICH_COLUMNS}
      rowKey={(r) => r.id}
      loading
      loadingRows={5}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataGrid<Row>
      data={[]}
      columns={RICH_COLUMNS}
      rowKey={(r) => r.id}
      emptyMessage="No users yet"
    />
  ),
};
