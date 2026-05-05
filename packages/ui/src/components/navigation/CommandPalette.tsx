import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useEscape } from '../../core';
import { Search } from '../../icons';
import { Kbd } from '../display/Kbd';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string[];
  group?: string;
  onSelect: () => void;
  keywords?: string[];
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
}

const filterItems = (items: CommandItem[], q: string): CommandItem[] => {
  if (!q.trim()) return items;
  const query = q.toLowerCase();
  return items.filter((item) => {
    const haystack = [item.label, item.description ?? '', ...(item.keywords ?? [])]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });
};

export const CommandPalette = ({
  isOpen,
  onClose,
  items,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No results',
}: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEscape(onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const filtered = useMemo(() => filterItems(items, query), [items, query]);

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      const g = item.group ?? '';
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(item);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const select = (item: CommandItem) => {
    item.onSelect();
    onClose();
  };

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="mf-cmd-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActive((i) => Math.min(filtered.length - 1, i + 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActive((i) => Math.max(0, i - 1));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const item = filtered[active];
          if (item) select(item);
        }
      }}
    >
      <div className="mf-cmd-modal" role="dialog" aria-modal="true">
        <div className="mf-cmd-search">
          <Search size={16} color="var(--mf-color-textMuted)" />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
          />
          <Kbd>Esc</Kbd>
        </div>
        <div className="mf-cmd-list">
          {filtered.length === 0 && <div className="mf-cmd-empty">{emptyMessage}</div>}
          {groups.map(([group, groupItems]) => (
            <Fragment key={group || 'default'}>
              {group && <div className="mf-cmd-group-label">{group}</div>}
              {groupItems.map((item) => {
                const idx = filtered.indexOf(item);
                return (
                  <div
                    key={item.id}
                    className="mf-cmd-item"
                    data-active={idx === active ? 'true' : undefined}
                    onMouseEnter={() => setActive(idx)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      select(item);
                    }}
                  >
                    {item.icon && <span style={{ display: 'inline-flex', color: 'var(--mf-color-textMuted)' }}>{item.icon}</span>}
                    <span style={{ flex: 1 }}>
                      {item.label}
                      {item.description && (
                        <span style={{ display: 'block', fontSize: 'var(--mf-fs-xs)', color: 'var(--mf-color-textMuted)' }}>
                          {item.description}
                        </span>
                      )}
                    </span>
                    {item.shortcut && (
                      <span className="mf-cmd-item-shortcut">
                        {item.shortcut.map((k) => (
                          <Kbd key={k}>{k}</Kbd>
                        ))}
                      </span>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
};
