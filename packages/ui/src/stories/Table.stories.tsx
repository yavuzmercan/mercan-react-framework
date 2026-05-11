import type { Meta, StoryObj } from '@storybook/react';
import { Table, type TableColumn } from '../components/display/Table';
import { Badge } from '../components/display/Badge';

interface Plan {
  name: string;
  seats: string;
  price: string;
  status: 'active' | 'trial' | 'expired';
}

const ROWS: Plan[] = [
  { name: 'Free', seats: '1 seat', price: '$0', status: 'active' },
  { name: 'Pro', seats: 'Up to 10 seats', price: '$29 / mo', status: 'trial' },
  { name: 'Team', seats: 'Up to 50 seats', price: '$99 / mo', status: 'active' },
  { name: 'Enterprise', seats: 'Unlimited', price: 'Custom', status: 'expired' },
];

const STATUS_SCHEME: Record<Plan['status'], 'success' | 'warning' | 'neutral'> = {
  active: 'success',
  trial: 'warning',
  expired: 'neutral',
};

const COLUMNS: TableColumn<Plan>[] = [
  { key: 'name', header: 'Plan' },
  { key: 'seats', header: 'Seats' },
  { key: 'price', header: 'Price', align: 'right' },
  {
    key: 'status',
    header: 'Status',
    align: 'right',
    cell: (r) => <Badge colorScheme={STATUS_SCHEME[r.status]}>{r.status}</Badge>,
  },
];

const meta: Meta<typeof Table<Plan>> = {
  title: 'Display/Table',
  component: Table<Plan>,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A simple typed table for static data. For sortable/paginated/selectable rows, use `<DataGrid>` instead.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table<Plan>>;

export const Basic: Story = {
  render: () => <Table data={ROWS} columns={COLUMNS} />,
};

export const Striped: Story = {
  render: () => <Table data={ROWS} columns={COLUMNS} striped hover />,
};

export const Empty: Story = {
  render: () => <Table data={[]} columns={COLUMNS} emptyMessage="No plans configured." />,
};
