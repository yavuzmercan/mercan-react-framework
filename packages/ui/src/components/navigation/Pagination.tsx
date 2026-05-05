import { cx } from '../../core';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const range = (start: number, end: number): number[] => {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
};

const buildPages = (page: number, total: number, sib: number): (number | '…')[] => {
  if (total <= 7 + sib * 2) return range(1, total);
  const left = Math.max(2, page - sib);
  const right = Math.min(total - 1, page + sib);
  const pages: (number | '…')[] = [1];
  if (left > 2) pages.push('…');
  for (const p of range(left, right)) pages.push(p);
  if (right < total - 1) pages.push('…');
  pages.push(total);
  return pages;
};

export const Pagination = ({ page, pageCount, onChange, siblingCount = 1, className }: PaginationProps) => {
  if (pageCount <= 1) return null;
  const pages = buildPages(page, pageCount, siblingCount);
  return (
    <nav aria-label="Pagination" className={cx('mf-pagination', className)}>
      <button
        type="button"
        className="mf-page-btn mf-focus-ring"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="mf-page-btn" aria-hidden="true" style={{ border: 0, cursor: 'default' }}>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className="mf-page-btn mf-focus-ring"
            data-active={p === page ? 'true' : undefined}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        className="mf-page-btn mf-focus-ring"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};
