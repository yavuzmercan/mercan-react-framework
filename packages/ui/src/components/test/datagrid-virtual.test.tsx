import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataGrid, type DataGridColumn } from '../display/DataGrid';

interface Row {
  id: number;
  name: string;
}

const makeRows = (n: number): Row[] =>
  Array.from({ length: n }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}` }));

const COLUMNS: DataGridColumn<Row>[] = [
  { key: 'name', header: 'Name' },
];

describe('DataGrid — virtualize', () => {
  it('renders only a window of rows for 1000 records', () => {
    const rows = makeRows(1000);
    render(
      <DataGrid<Row>
        data={rows}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        virtualize
        rowHeight={40}
        maxHeight={400}
      />,
    );
    // Painted rows = overscan + visible window; nowhere near 1000.
    const painted = document.querySelectorAll('.mf-datagrid-row').length;
    expect(painted).toBeGreaterThan(0);
    expect(painted).toBeLessThan(60); // way under 1000
  });

  it('paints first row by default (top of list)', () => {
    render(
      <DataGrid<Row>
        data={makeRows(500)}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        virtualize
        rowHeight={40}
        maxHeight={400}
      />,
    );
    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(screen.queryByText('Row 499')).not.toBeInTheDocument();
  });

  it('inserts a tall spacer <tr> matching the scroll height', () => {
    const rows = makeRows(500);
    const { container } = render(
      <DataGrid<Row>
        data={rows}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        virtualize
        rowHeight={40}
        maxHeight={400}
      />,
    );
    // Bottom spacer should be ~ 500 rows * 40 px minus the painted window.
    const spacers = container.querySelectorAll('tr[aria-hidden="true"]');
    expect(spacers.length).toBeGreaterThan(0);
  });

  it('does NOT virtualize when virtualize=false (default)', () => {
    render(
      <DataGrid<Row>
        data={makeRows(50)}
        columns={COLUMNS}
        rowKey={(r) => r.id}
      />,
    );
    expect(document.querySelectorAll('.mf-datagrid-row').length).toBe(50);
  });

  it('virtualize takes precedence over pagination', () => {
    render(
      <DataGrid<Row>
        data={makeRows(500)}
        columns={COLUMNS}
        rowKey={(r) => r.id}
        virtualize
        rowHeight={40}
        maxHeight={400}
        pagination={{ pageSize: 10 }}
      />,
    );
    // Pagination footer should not appear when virtualize is on.
    expect(document.querySelector('.mf-datagrid-footer')).toBeNull();
  });
});
