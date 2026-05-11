---
"@yavuzmercan/ui": minor
---

feat: form validation with `useForm` + tests for `Combobox`, `MultiSelect`, `DatePicker`, `Calendar`

### `useForm` hook

Lightweight form state with values, errors, touched, dirty, submit lifecycle, and a pluggable resolver:

```tsx
import { useForm, zodResolver } from '@yavuzmercan/ui';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

const form = useForm({
  defaultValues: { name: '', email: '' },
  resolver: zodResolver(schema),
  mode: 'onSubmit',          // when to validate before first submit
  reValidateMode: 'onChange', // when to validate after first submit
});

const onSubmit = form.handleSubmit(async (values) => {
  await api.save(values);
});

return (
  <form onSubmit={onSubmit}>
    <FormField label="Name" errorText={form.getFieldState('name').error}>
      <Input {...form.register('name')} />
    </FormField>
    <Button type="submit" loading={form.isSubmitting}>Save</Button>
  </form>
);
```

`form.register(name)` returns `{ name, value, onChange, onBlur }` ready to spread onto an input. `onChange` understands both DOM events (`<Input />`, `<Checkbox />`, `type='number'`) and raw values (`<Combobox />`, `<DatePicker />`, `<MultiSelect />`). `getFieldState` exposes per-field `{ error, touched, dirty, invalid }`.

### `zodResolver`

Adapter that maps zod issues onto field errors keyed by `path[0]`. zod is treated as an optional peer — the adapter only depends on the structural shape of `safeParse` / `safeParseAsync`, so consumers who don't use zod don't pay for it.

### Custom resolver

Don't want zod? Pass any `(values) => Partial<Record<keyof T, string>>` (sync or async).

### Test coverage

`Combobox`, `MultiSelect`, `DatePicker`, `Calendar` now have behavior tests covering filtering, keyboard navigation, day selection, min/max date bounds, and popover toggle. **Total: 124 tests across 15 files.**

### Bug fix

`DatePicker` popover would not open in some interaction patterns because `onClick` (toggle) and `onFocus` (open) batched in the same render, leaving `open=false`. Replaced `onFocus` with explicit keyboard support (`Enter`/`Space` to toggle, `Escape` to close).
