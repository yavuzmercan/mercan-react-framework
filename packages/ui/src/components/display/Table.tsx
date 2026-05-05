import { type ReactNode, type TableHTMLAttributes } from 'react';
import { cx } from '../../core';

export interface TableColumn<T> {
  key: keyof T | string;
  header: ReactNode;
  cell?: (row: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
}

export interface TableProps<T> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  data: T[];
  columns: TableColumn<T>[];
  striped?: boolean;
  hover?: boolean;
  rowKey?: (row: T, index: number) => string | number;
  emptyMessage?: ReactNode;
}

export const Table = <T,>({
  data,
  columns,
  striped,
  hover,
  rowKey,
  emptyMessage = 'No data',
  className,
  ...rest
}: TableProps<T>) => (
  <div className="mf-table-wrap">
    <table
      className={cx('mf-table', className)}
      data-striped={striped ? 'true' : undefined}
      data-hover={hover ? 'true' : undefined}
      {...rest}
    >
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th
              key={String(col.key) + i}
              style={{ textAlign: col.align, width: col.width }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center', color: 'var(--mf-color-textMuted)', padding: 'var(--mf-spacing-xl)' }}>
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={rowKey ? rowKey(row, i) : i}>
              {columns.map((col, j) => (
                <td key={String(col.key) + j} style={{ textAlign: col.align }}>
                  {col.cell ? col.cell(row, i) : String((row as any)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
