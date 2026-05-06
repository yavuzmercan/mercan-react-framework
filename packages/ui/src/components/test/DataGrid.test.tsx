import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataGrid, type DataGridColumn } from '../display/DataGrid';

interface Row {
  id: number;
  name: string;
  age: number;
}

const ROWS: Row[] = [
  { id: 1, name: 'Charlie', age: 30 },
  { id: 2, name: 'Alice', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
];

const COLUMNS: DataGridColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true, sortAccessor: (r) => r.age },
];

const getRowNames = () =>
  Array.from(document.querySelectorAll('.mf-datagrid-row[data-selected], .mf-datagrid-row:not([data-selected])'))
    .map((tr) => tr.querySelectorAll('td.mf-datagrid-td')[0]?.textContent ?? '')
    .filter((s) => s !== '');

describe('DataGrid', () => {
  it('renders rows from data', () => {
    render(<DataGrid data={ROWS} columns={COLUMNS} rowKey={(r) => r.id} />);
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('sorts ascending then descending then back to none on header click', async () => {
    const user = userEvent.setup();
    render(<DataGrid data={ROWS} columns={COLUMNS} rowKey={(r) => r.id} />);

    // Initial: original order
    expect(getRowNames()).toEqual(['Charlie', 'Alice', 'Bob']);

    // First click: asc
    await user.click(screen.getByRole('button', { name: /name/i }));
    expect(getRowNames()).toEqual(['Alice', 'Bob', 'Charlie']);

    // Second click: desc
    await user.click(screen.getByRole('button', { name: /name/i }));
    expect(getRowNames()).toEqual(['Charlie', 'Bob', 'Alice']);

    // Third click: back to none
    await user.click(screen.getByRole('button', { name: /name/i }));
    expect(getRowNames()).toEqual(['Charlie', 'Alice', 'Bob']);
  });

  it('uses sortAccessor for numeric columns', async () => {
    const user = userEvent.setup();
    render(<DataGrid data={ROWS} columns={COLUMNS} rowKey={(r) => r.id} />);

    await user.click(screen.getByRole('button', { name: /age/i }));
    expect(getRowNames()).toEqual(['Alice', 'Charlie', 'Bob']);
  });

  it('honors defaultSort', () => {
    render(
      <DataGrid
        data={ROWS}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        defaultSort={{ key: 'name', direction: 'asc' }}
      />,
    );
    expect(getRowNames()).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('paginates rows', () => {
    const data = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}`, age: i }));
    render(
      <DataGrid
        data={data}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        pagination={{ pageSize: 3 }}
      />,
    );
    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(screen.getByText('Row 3')).toBeInTheDocument();
    expect(screen.queryByText('Row 4')).not.toBeInTheDocument();
  });

  it('navigates pages', async () => {
    const user = userEvent.setup();
    const data = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}`, age: i }));
    render(
      <DataGrid
        data={data}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        pagination={{ pageSize: 3 }}
      />,
    );
    // Click page 2
    await user.click(screen.getByRole('button', { name: '2' }));
    expect(screen.queryByText('Row 1')).not.toBeInTheDocument();
    expect(screen.getByText('Row 4')).toBeInTheDocument();
    expect(screen.getByText('Row 6')).toBeInTheDocument();
  });

  it('multi-select toggles rows and reports change', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <DataGrid
        data={ROWS}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        selectable="multiple"
        onSelectionChange={onSelectionChange}
      />,
    );
    // First row checkbox (skipping header checkbox)
    const checkboxes = screen.getAllByRole('checkbox', { name: 'Select row' });
    await user.click(checkboxes[0]!);
    expect(onSelectionChange).toHaveBeenCalledWith([1]);
    await user.click(checkboxes[1]!);
    expect(onSelectionChange).toHaveBeenLastCalledWith([1, 2]);
  });

  it('shows empty message when data is empty', () => {
    render(
      <DataGrid
        data={[]}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        emptyMessage="No matches"
      />,
    );
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('renders skeleton rows when loading', () => {
    render(
      <DataGrid
        data={ROWS}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        loading
        loadingRows={3}
      />,
    );
    // Real data should NOT show
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
    // 3 skeleton rows × 2 cells = 6 skeleton elements (no select column)
    const rows = document.querySelectorAll('.mf-datagrid-row');
    expect(rows.length).toBe(3);
  });

  it('uses custom cell renderer', () => {
    render(
      <DataGrid
        data={ROWS}
        columns={[
          {
            key: 'name',
            header: 'Name',
            cell: (row) => <strong data-testid={`cell-${row.id}`}>{row.name.toUpperCase()}</strong>,
          },
        ]}
        rowKey={(r) => r.id}
      />,
    );
    expect(within(screen.getByTestId('cell-1')).getByText('CHARLIE')).toBeInTheDocument();
  });

  it('manualSort: does not sort data; relies on parent', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <DataGrid
        data={ROWS}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        manualSort
        onSortChange={onSortChange}
      />,
    );
    await user.click(screen.getByRole('button', { name: /name/i }));
    expect(onSortChange).toHaveBeenCalledWith({ key: 'name', direction: 'asc' });
    // Data order unchanged because manualSort is true
    expect(getRowNames()).toEqual(['Charlie', 'Alice', 'Bob']);
  });
});
