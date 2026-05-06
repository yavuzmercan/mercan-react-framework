---
"@yavuzmercan/ui": minor
---

feat: add `DataGrid` component for sortable, paginated, selectable data tables

The existing `Table` is for simple key/value-style data. `DataGrid` is for real-world dashboard tables — everything you actually need:

- **Sortable columns** — click header to cycle asc / desc / none
- **Built-in pagination** — `pagination={{ pageSize: 10 }}` and you're done
- **Row selection** — `selectable="single"` or `"multiple"` with header select-all + indeterminate state
- **Loading skeletons** — `loading` prop renders `loadingRows` placeholder rows
- **Empty state** — customizable `emptyState` / `emptyMessage`
- **Density** — `compact` or `comfortable`
- **Sticky header** — `stickyHeader` + `maxHeight` for long lists
- **Striped + hover** — visual options
- **Server-side mode** — `manualSort` + `manualPagination` for fetched data with controlled state

```tsx
<DataGrid<User>
  data={users}
  columns={[
    { key: 'name', header: 'Name', sortable: true, cell: (u) => <UserCell user={u} /> },
    { key: 'role', header: 'Role', sortable: true, width: 100 },
    { key: 'status', header: 'Status', cell: (u) => <Badge>{u.status}</Badge> },
  ]}
  rowKey={(u) => u.id}
  selectable="multiple"
  selected={selected}
  onSelectionChange={setSelected}
  pagination={{ pageSize: 20 }}
  defaultSort={{ key: 'name', direction: 'asc' }}
/>
```

Fully typed generic — TypeScript infers row type from `data`. Works alongside the existing `Table` (kept for minimal cases).
