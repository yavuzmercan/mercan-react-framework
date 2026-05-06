import { useState } from 'react';
import {
  DataGrid,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Button,
  Switch,
  Select,
  type DataGridColumn,
} from '@yavuzmercan/ui';
import { Trash, Edit } from '@yavuzmercan/ui/icons';
import { Story, PropsTable } from '../Story';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'invited' | 'disabled';
  joined: Date;
  posts: number;
}

const SAMPLE_DATA: User[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin', status: 'active', joined: new Date('2024-01-12'), posts: 142 },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Editor', status: 'active', joined: new Date('2024-02-03'), posts: 87 },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor', status: 'invited', joined: new Date('2024-03-22'), posts: 56 },
  { id: 4, name: 'Linus Torvalds', email: 'linus@example.com', role: 'Admin', status: 'active', joined: new Date('2023-11-08'), posts: 234 },
  { id: 5, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Viewer', status: 'active', joined: new Date('2024-04-15'), posts: 23 },
  { id: 6, name: 'Donald Knuth', email: 'donald@example.com', role: 'Editor', status: 'disabled', joined: new Date('2023-09-01'), posts: 412 },
  { id: 7, name: 'Tim Berners-Lee', email: 'tim@example.com', role: 'Admin', status: 'active', joined: new Date('2024-01-30'), posts: 178 },
  { id: 8, name: 'John von Neumann', email: 'jvn@example.com', role: 'Viewer', status: 'invited', joined: new Date('2024-05-01'), posts: 12 },
  { id: 9, name: 'Edsger Dijkstra', email: 'edsger@example.com', role: 'Editor', status: 'active', joined: new Date('2023-12-10'), posts: 98 },
  { id: 10, name: 'Barbara Liskov', email: 'barbara@example.com', role: 'Admin', status: 'active', joined: new Date('2024-02-19'), posts: 156 },
  { id: 11, name: 'John McCarthy', email: 'jmc@example.com', role: 'Editor', status: 'active', joined: new Date('2024-03-08'), posts: 67 },
  { id: 12, name: 'Niklaus Wirth', email: 'niklaus@example.com', role: 'Viewer', status: 'invited', joined: new Date('2024-04-28'), posts: 34 },
];

const statusColor = (s: User['status']) =>
  s === 'active' ? 'success' : s === 'invited' ? 'warning' : 'neutral';

/* ===== Demo 1 — Full-featured ===== */

const FullDemo = () => {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const [density, setDensity] = useState<'compact' | 'comfortable'>('comfortable');
  const [striped, setStriped] = useState(false);

  const columns: DataGridColumn<User>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      cell: (row) => (
        <HStack gap="sm" align="center">
          <Avatar name={row.name} size="sm" />
          <Text size="sm" weight="medium">{row.name}</Text>
        </HStack>
      ),
    },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true, width: 100 },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: 120,
      cell: (row) => <Badge colorScheme={statusColor(row.status)}>{row.status}</Badge>,
    },
    {
      key: 'posts',
      header: 'Posts',
      sortable: true,
      align: 'right',
      width: 80,
      sortAccessor: (row) => row.posts,
    },
    {
      key: 'joined',
      header: 'Joined',
      sortable: true,
      sortAccessor: (row: User) => row.joined,
      cell: (row: User) => row.joined.toLocaleDateString(),
      width: 110,
    },
    {
      key: 'actions',
      header: '',
      width: 80,
      align: 'right',
      cell: () => (
        <HStack gap="xs" justify="end">
          <Button size="sm" variant="ghost" leftIcon={<Edit size={12} />}>Edit</Button>
          <Button size="sm" variant="ghost" colorScheme="danger" leftIcon={<Trash size={12} />}>Delete</Button>
        </HStack>
      ),
    },
  ];

  return (
    <VStack gap="md">
      <HStack gap="md" align="center" wrap>
        <Select
          value={density}
          onChange={(e) => setDensity(e.target.value as 'compact' | 'comfortable')}
          options={[
            { value: 'comfortable', label: 'Comfortable' },
            { value: 'compact', label: 'Compact' },
          ]}
          style={{ width: 160 }}
        />
        <Switch checked={striped} onChange={(e) => setStriped(e.target.checked)} label="Striped" />
        <Text size="sm" tone="muted">{selected.length} selected</Text>
      </HStack>
      <DataGrid<User>
        data={SAMPLE_DATA}
        columns={columns}
        rowKey={(r: User) => r.id}
        selectable="multiple"
        selected={selected}
        onSelectionChange={setSelected}
        pagination={{ pageSize: 5 }}
        defaultSort={{ key: 'name', direction: 'asc' }}
        density={density}
        striped={striped}
      />
    </VStack>
  );
};

/* ===== Demo 2 — Loading state ===== */

const LoadingDemo = () => {
  const [loading, setLoading] = useState(true);
  const columns: DataGridColumn<User>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
  ];
  return (
    <VStack gap="md">
      <Button size="sm" onClick={() => setLoading((v) => !v)}>
        Toggle loading: {loading ? 'on' : 'off'}
      </Button>
      <DataGrid<User>
        data={SAMPLE_DATA.slice(0, 5)}
        columns={columns}
        rowKey={(r: User) => r.id}
        loading={loading}
        loadingRows={5}
      />
    </VStack>
  );
};

/* ===== Demo 3 — Empty state ===== */

const EmptyDemo = () => (
  <DataGrid<User>
    data={[]}
    columns={[
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ]}
    rowKey={(r: User) => r.id}
    emptyMessage="No users match your filter"
  />
);

/* ===== Page ===== */

export const DataGridPage = () => (
  <VStack gap="lg">
    <div>
      <Heading level={1}>DataGrid</Heading>
      <Text size="lg" tone="muted">
        Sortable columns, built-in pagination, row selection, loading skeletons, sticky header,
        density modes — everything a real-world data table needs.
      </Text>
    </div>

    <Story
      title="Full-featured grid — sort, pagination, multi-select"
      code={`<DataGrid<User>
  data={users}
  columns={columns}
  rowKey={(r: User) => r.id}
  selectable="multiple"
  selected={selected}
  onSelectionChange={setSelected}
  pagination={{ pageSize: 5 }}
  defaultSort={{ key: 'name', direction: 'asc' }}
  density="comfortable"
/>`}
    >
      <FullDemo />
    </Story>

    <Story
      title="Loading skeletons"
      code={`<DataGrid loading loadingRows={5} ... />`}
    >
      <LoadingDemo />
    </Story>

    <Story
      title="Empty state"
      code={`<DataGrid data={[]} emptyMessage="No users found" ... />`}
    >
      <EmptyDemo />
    </Story>

    <Heading level={3}>Column definition</Heading>
    <PropsTable
      rows={[
        { prop: 'key', type: 'string', description: 'Unique column id. Used for sortKey + React keys.' },
        { prop: 'header', type: 'ReactNode', description: 'Header label or node.' },
        { prop: 'cell', type: '(row, index) => ReactNode', description: 'Custom renderer. Defaults to `row[key]` stringified.' },
        { prop: 'sortable', type: 'boolean', defaultValue: 'false', description: 'Show sort button in header. Click cycles asc → desc → none.' },
        { prop: 'sortAccessor', type: '(row) => string | number | Date', description: 'Custom sort accessor. Useful for nested or computed values.' },
        { prop: 'align', type: "'left' | 'center' | 'right'", description: 'Column alignment.' },
        { prop: 'width', type: 'number | string', description: 'Fixed column width.' },
      ]}
    />

    <Heading level={3}>DataGrid props</Heading>
    <PropsTable
      rows={[
        { prop: 'data', type: 'T[]', description: 'Row data.' },
        { prop: 'columns', type: 'DataGridColumn<T>[]', description: 'Column definitions.' },
        { prop: 'rowKey', type: '(row, i) => key', description: 'Stable key per row — required for selection and React keys.' },
        { prop: 'selectable', type: "'single' | 'multiple'", description: 'Enable row selection. Renders a leading checkbox/radio column.' },
        { prop: 'selected', type: 'Array<key>', description: 'Controlled selected keys.' },
        { prop: 'onSelectionChange', type: '(keys) => void', description: 'Selection change callback.' },
        { prop: 'defaultSort', type: '{ key, direction }', description: 'Initial sort (uncontrolled).' },
        { prop: 'sort', type: '{ key, direction } | null', description: 'Controlled sort.' },
        { prop: 'onSortChange', type: '(sort) => void', description: 'Sort change callback.' },
        { prop: 'manualSort', type: 'boolean', description: 'Disable client-side sorting; you provide pre-sorted data.' },
        { prop: 'pagination', type: '{ pageSize, page?, onPageChange? }', description: 'Pagination config. Omit to render all rows.' },
        { prop: 'manualPagination', type: 'boolean', description: 'Disable client-side pagination; you slice data yourself.' },
        { prop: 'totalCount', type: 'number', description: 'Total count for manual pagination.' },
        { prop: 'density', type: "'compact' | 'comfortable'", defaultValue: "'comfortable'", description: 'Visual density.' },
        { prop: 'stickyHeader', type: 'boolean', description: 'Header stays visible during vertical scroll. Pair with `maxHeight`.' },
        { prop: 'maxHeight', type: 'number | string', description: 'Container max-height for sticky header to do something.' },
        { prop: 'striped', type: 'boolean', description: 'Alternate row backgrounds.' },
        { prop: 'hover', type: 'boolean', defaultValue: 'true', description: 'Highlight rows on hover.' },
        { prop: 'loading', type: 'boolean', description: 'Show skeleton rows instead of data.' },
        { prop: 'loadingRows', type: 'number', defaultValue: '5', description: 'Number of skeleton rows when loading.' },
        { prop: 'emptyState', type: 'ReactNode', description: 'Custom empty-state node.' },
        { prop: 'emptyMessage', type: 'string', defaultValue: "'No data'", description: 'Default empty-state message.' },
      ]}
    />

    <Heading level={3}>Server-side mode</Heading>
    <Text>
      For large datasets fetched from an API, switch to manual mode and pass already-sorted/paginated data:
    </Text>
    <Story title="Server-side sort + pagination" code={`<DataGrid<Row>
  data={pageData}
  columns={columns}
  rowKey={(r: User) => r.id}
  manualSort
  manualPagination
  totalCount={response.total}
  sort={sort}
  onSortChange={setSort}    // refetch when sort changes
  pagination={{
    pageSize: 20,
    page: page,
    onPageChange: setPage,  // refetch when page changes
  }}
  loading={isFetching}
/>`}>
      <Text size="sm" tone="muted">
        With <code>manualSort</code> + <code>manualPagination</code>, the grid trusts your data and reports user intent via callbacks. Wire them to your fetch logic.
      </Text>
    </Story>
  </VStack>
);
