import { useMemo, useState, type ReactNode } from 'react';
import { cx } from '../../core';
import { ChevronUp, ChevronDown, ArrowUpDown } from '../../icons';
import { Skeleton } from './Skeleton';
import { Pagination } from '../navigation/Pagination';
import { Checkbox } from '../forms/Checkbox';

export type SortDirection = 'asc' | 'desc';

export interface DataGridColumn<T> {
  /** Unique column id. Used for sortKey and React keys. */
  key: string;
  /** Header label or node. */
  header: ReactNode;
  /** Custom cell renderer. Falls back to `row[key]` (stringified). */
  cell?: (row: T, index: number) => ReactNode;
  /** Show a sort button in the header. Default false. */
  sortable?: boolean;
  /** Custom sort accessor — return a comparable value (string/number/date). */
  sortAccessor?: (row: T) => string | number | Date;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  /** Hide on small screens, etc. via className filter. */
  className?: string;
}

export interface DataGridSort {
  key: string;
  direction: SortDirection;
}

export interface DataGridPagination {
  pageSize: number;
  /** Controlled mode — current page (1-indexed). */
  page?: number;
  /** Notified when the user navigates to another page. */
  onPageChange?: (page: number) => void;
}

export interface DataGridProps<T> {
  data: T[];
  columns: DataGridColumn<T>[];
  rowKey: (row: T, index: number) => string | number;

  /** Selection mode. */
  selectable?: 'single' | 'multiple';
  /** Controlled selected row keys. */
  selected?: Array<string | number>;
  /** Default selected (uncontrolled). */
  defaultSelected?: Array<string | number>;
  /** Notified on selection change. */
  onSelectionChange?: (selected: Array<string | number>) => void;

  /** Default sort (uncontrolled). */
  defaultSort?: DataGridSort;
  /** Controlled sort. */
  sort?: DataGridSort | null;
  onSortChange?: (sort: DataGridSort | null) => void;
  /** When true, the component does not sort data itself — pass already-sorted `data`. */
  manualSort?: boolean;

  /** Pagination config. Omit to disable pagination. */
  pagination?: DataGridPagination;
  /** When true, the component does not paginate — pass current page's `data` directly. */
  manualPagination?: boolean;
  /** Total count for manual pagination (so the pager knows how many pages). */
  totalCount?: number;

  /** Visual density. */
  density?: 'compact' | 'comfortable';
  /** Sticky header during scroll. */
  stickyHeader?: boolean;
  /** Container max-height; required for stickyHeader to do something. */
  maxHeight?: number | string;
  /** Stripe alternate rows. */
  striped?: boolean;
  /** Highlight rows on hover. */
  hover?: boolean;

  /** Loading state — renders `loadingRows` skeleton rows. */
  loading?: boolean;
  loadingRows?: number;

  /** Empty state node when data is empty (and not loading). */
  emptyState?: ReactNode;
  emptyMessage?: string;

  className?: string;
}

const compareValues = (a: unknown, b: unknown): number => {
  if (a === b) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
};

export function DataGrid<T>({
  data,
  columns,
  rowKey,

  selectable,
  selected: selectedProp,
  defaultSelected = [],
  onSelectionChange,

  defaultSort,
  sort: sortProp,
  onSortChange,
  manualSort,

  pagination,
  manualPagination,
  totalCount,

  density = 'comfortable',
  stickyHeader,
  maxHeight,
  striped,
  hover = true,

  loading,
  loadingRows = 5,

  emptyState,
  emptyMessage = 'No data',

  className,
}: DataGridProps<T>) {
  // Sort state — controlled or internal
  const [internalSort, setInternalSort] = useState<DataGridSort | null>(defaultSort ?? null);
  const sort = sortProp !== undefined ? sortProp : internalSort;

  const setSort = (next: DataGridSort | null) => {
    if (sortProp === undefined) setInternalSort(next);
    onSortChange?.(next);
  };

  const cycleSort = (key: string) => {
    if (!sort || sort.key !== key) {
      setSort({ key, direction: 'asc' });
    } else if (sort.direction === 'asc') {
      setSort({ key, direction: 'desc' });
    } else {
      setSort(null);
    }
  };

  // Pagination state — internal for uncontrolled
  const [internalPage, setInternalPage] = useState(1);
  const currentPage = pagination?.page ?? internalPage;
  const pageSize = pagination?.pageSize ?? 0;

  const setPage = (next: number) => {
    if (pagination?.page === undefined) setInternalPage(next);
    pagination?.onPageChange?.(next);
  };

  // Selection state
  const [internalSelected, setInternalSelected] = useState<Array<string | number>>(defaultSelected);
  const selected = selectedProp ?? internalSelected;
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const setSelection = (next: Array<string | number>) => {
    if (selectedProp === undefined) setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const toggleRow = (key: string | number) => {
    if (selectable === 'single') {
      setSelection(selectedSet.has(key) ? [] : [key]);
    } else {
      const next = new Set(selectedSet);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setSelection(Array.from(next));
    }
  };

  // Apply sort
  const sortedData = useMemo(() => {
    if (manualSort || !sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return data;
    const accessor =
      col.sortAccessor ?? ((row: T) => (row as Record<string, unknown>)[sort.key] as string | number | Date);
    const dir = sort.direction === 'asc' ? 1 : -1;
    return [...data].sort((a, b) => compareValues(accessor(a), accessor(b)) * dir);
  }, [data, columns, sort, manualSort]);

  // Apply pagination
  const pagedData = useMemo(() => {
    if (manualPagination || !pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, pagination, manualPagination]);

  const total = manualPagination ? totalCount ?? data.length : sortedData.length;
  const pageCount = pagination ? Math.max(1, Math.ceil(total / pageSize)) : 1;

  // All rows on current page selected? (for header checkbox)
  const allKeysOnPage = pagedData.map((row, i) => rowKey(row, i));
  const allSelectedOnPage =
    allKeysOnPage.length > 0 && allKeysOnPage.every((k) => selectedSet.has(k));
  const someSelectedOnPage =
    !allSelectedOnPage && allKeysOnPage.some((k) => selectedSet.has(k));

  const toggleAllOnPage = () => {
    if (selectable !== 'multiple') return;
    if (allSelectedOnPage) {
      setSelection(selected.filter((k) => !allKeysOnPage.includes(k)));
    } else {
      const next = new Set(selectedSet);
      allKeysOnPage.forEach((k) => next.add(k));
      setSelection(Array.from(next));
    }
  };

  const showEmpty = !loading && pagedData.length === 0;

  return (
    <div className={cx('mf-datagrid', className)} data-density={density}>
      <div
        className="mf-datagrid-scroll"
        style={maxHeight ? { maxHeight, overflow: 'auto' } : undefined}
      >
        <table className="mf-datagrid-table" data-striped={striped ? 'true' : undefined} data-hover={hover ? 'true' : undefined}>
          <thead className={cx('mf-datagrid-head', stickyHeader && 'mf-datagrid-sticky')}>
            <tr>
              {selectable === 'multiple' && (
                <th className="mf-datagrid-th mf-datagrid-select-cell">
                  <Checkbox
                    aria-label="Select all"
                    checked={allSelectedOnPage}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelectedOnPage;
                    }}
                    onChange={toggleAllOnPage}
                  />
                </th>
              )}
              {selectable === 'single' && <th className="mf-datagrid-th mf-datagrid-select-cell" />}
              {columns.map((col) => {
                const isSorted = sort?.key === col.key;
                return (
                  <th
                    key={col.key}
                    className={cx('mf-datagrid-th', col.className)}
                    style={{ textAlign: col.align, width: col.width }}
                    aria-sort={isSorted ? (sort!.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        className="mf-datagrid-sort-btn"
                        onClick={() => cycleSort(col.key)}
                      >
                        <span>{col.header}</span>
                        {!isSorted && <ArrowUpDown size={12} color="var(--mf-color-textMuted)" />}
                        {isSorted && sort!.direction === 'asc' && <ChevronUp size={14} />}
                        {isSorted && sort!.direction === 'desc' && <ChevronDown size={14} />}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: loadingRows }).map((_, i) => (
                  <tr key={`__skeleton-${i}`} className="mf-datagrid-row">
                    {selectable && (
                      <td className="mf-datagrid-td mf-datagrid-select-cell">
                        <Skeleton width={16} height={16} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="mf-datagrid-td" style={{ textAlign: col.align }}>
                        <Skeleton width="80%" height={14} />
                      </td>
                    ))}
                  </tr>
                ))
              : pagedData.map((row, i) => {
                  const key = rowKey(row, i);
                  const isSelected = selectedSet.has(key);
                  return (
                    <tr
                      key={key}
                      className="mf-datagrid-row"
                      data-selected={isSelected ? 'true' : undefined}
                    >
                      {selectable && (
                        <td className="mf-datagrid-td mf-datagrid-select-cell">
                          {selectable === 'multiple' ? (
                            <Checkbox
                              aria-label="Select row"
                              checked={isSelected}
                              onChange={() => toggleRow(key)}
                            />
                          ) : (
                            <input
                              type="radio"
                              aria-label="Select row"
                              checked={isSelected}
                              onChange={() => toggleRow(key)}
                            />
                          )}
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={cx('mf-datagrid-td', col.className)}
                          style={{ textAlign: col.align }}
                        >
                          {col.cell ? col.cell(row, i) : String((row as Record<string, unknown>)[col.key] ?? '')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
            {showEmpty && (
              <tr className="mf-datagrid-row">
                <td
                  className="mf-datagrid-empty"
                  colSpan={columns.length + (selectable ? 1 : 0)}
                >
                  {emptyState ?? emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && pageCount > 1 && (
        <div className="mf-datagrid-footer">
          <span className="mf-datagrid-info">
            {total === 0 ? '0' : `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, total)} of ${total}`}
          </span>
          <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
