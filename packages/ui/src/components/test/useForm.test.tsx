import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useForm, zodResolver, type Resolver } from '../../core';

interface Values {
  name: string;
  email: string;
  age: number;
  agree: boolean;
}

const defaults: Values = { name: '', email: '', age: 0, agree: false };

const requiredResolver: Resolver<Values> = (v) => {
  const errors: Record<string, string> = {};
  if (!v.name) errors.name = 'Name required';
  if (!v.email.includes('@')) errors.email = 'Invalid email';
  if (v.age < 18) errors.age = 'Must be 18+';
  return errors as any;
};

describe('useForm', () => {
  it('starts with default values and clean state', () => {
    const { result } = renderHook(() => useForm<Values>({ defaultValues: defaults }));
    expect(result.current.values).toEqual(defaults);
    expect(result.current.errors).toEqual({});
    expect(result.current.isDirty).toBe(false);
    expect(result.current.isSubmitted).toBe(false);
    expect(result.current.submitCount).toBe(0);
  });

  it('setValue updates value and marks dirty', () => {
    const { result } = renderHook(() => useForm<Values>({ defaultValues: defaults }));
    act(() => result.current.setValue('name', 'Ada'));
    expect(result.current.values.name).toBe('Ada');
    expect(result.current.isDirty).toBe(true);
    expect(result.current.dirty.name).toBe(true);
  });

  it('register onChange unwraps event values from inputs', () => {
    const { result } = renderHook(() => useForm<Values>({ defaultValues: defaults }));
    act(() => {
      result.current.register('name').onChange({
        target: { value: 'Linus', type: 'text' },
        preventDefault: () => {},
      } as any);
    });
    expect(result.current.values.name).toBe('Linus');
  });

  it('register onChange unwraps checkbox.checked', () => {
    const { result } = renderHook(() => useForm<Values>({ defaultValues: defaults }));
    act(() => {
      result.current.register('agree').onChange({
        target: { checked: true, type: 'checkbox' },
        preventDefault: () => {},
      } as any);
    });
    expect(result.current.values.agree).toBe(true);
  });

  it('register onChange accepts a raw value (non-event) for custom inputs', () => {
    const { result } = renderHook(() => useForm<Values>({ defaultValues: defaults }));
    act(() => result.current.register('age').onChange(30 as any));
    expect(result.current.values.age).toBe(30);
  });

  it('handleSubmit blocks invalid submit and surfaces errors', async () => {
    const onValid = vi.fn();
    const onInvalid = vi.fn();
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: defaults, resolver: requiredResolver }),
    );
    await act(async () => {
      await result.current.handleSubmit(onValid, onInvalid)();
    });
    expect(onValid).not.toHaveBeenCalled();
    expect(onInvalid).toHaveBeenCalled();
    expect(result.current.errors.name).toBe('Name required');
    expect(result.current.errors.email).toBe('Invalid email');
    expect(result.current.errors.age).toBe('Must be 18+');
    expect(result.current.touched.name).toBe(true);
    expect(result.current.isSubmitted).toBe(true);
    expect(result.current.submitCount).toBe(1);
  });

  it('handleSubmit calls onValid when values pass resolver', async () => {
    const onValid = vi.fn();
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: defaults, resolver: requiredResolver }),
    );
    act(() => result.current.setValues({ name: 'Ada', email: 'a@b.com', age: 30 }));
    await act(async () => {
      await result.current.handleSubmit(onValid)();
    });
    expect(onValid).toHaveBeenCalledWith({ name: 'Ada', email: 'a@b.com', age: 30, agree: false });
    expect(result.current.errors).toEqual({});
  });

  it('mode=onChange validates on every setValue', async () => {
    const { result } = renderHook(() =>
      useForm<Values>({
        defaultValues: defaults,
        resolver: requiredResolver,
        mode: 'onChange',
      }),
    );
    await act(async () => {
      result.current.setValue('email', 'no-at');
    });
    expect(result.current.errors.email).toBe('Invalid email');
    await act(async () => {
      result.current.setValue('email', 'ada@example.com');
    });
    expect(result.current.errors.email).toBeUndefined();
  });

  it('reValidateMode=onChange after first submit', async () => {
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: defaults, resolver: requiredResolver }),
    );
    await act(async () => {
      await result.current.handleSubmit(() => {})();
    });
    expect(result.current.errors.name).toBe('Name required');
    await act(async () => {
      result.current.setValue('name', 'Ada');
    });
    expect(result.current.errors.name).toBeUndefined();
  });

  it('reset restores defaults and clears state', () => {
    const { result } = renderHook(() => useForm<Values>({ defaultValues: defaults }));
    act(() => {
      result.current.setValue('name', 'Ada');
      result.current.setError('name', 'oh no');
    });
    expect(result.current.values.name).toBe('Ada');
    act(() => result.current.reset());
    expect(result.current.values).toEqual(defaults);
    expect(result.current.errors).toEqual({});
    expect(result.current.isDirty).toBe(false);
  });

  it('reset({ partial }) merges into defaults', () => {
    const { result } = renderHook(() => useForm<Values>({ defaultValues: defaults }));
    act(() => result.current.reset({ name: 'Loaded' }));
    expect(result.current.values).toEqual({ ...defaults, name: 'Loaded' });
  });

  it('zodResolver maps zod issues onto errors keyed by path[0]', async () => {
    const fakeSchema = {
      safeParse: (v: any) => {
        const issues: Array<{ path: string[]; message: string }> = [];
        if (!v.name) issues.push({ path: ['name'], message: 'name req' });
        if (!v.email) issues.push({ path: ['email'], message: 'email req' });
        return issues.length === 0
          ? { success: true, data: v }
          : { success: false, error: { issues } };
      },
    };
    const resolver = zodResolver<Values>(fakeSchema as any);
    const errors = await resolver({ name: '', email: '', age: 0, agree: false });
    expect(errors.name).toBe('name req');
    expect(errors.email).toBe('email req');
  });

  it('async resolver still gates submit', async () => {
    const asyncResolver: Resolver<Values> = async (v) => {
      await new Promise((r) => setTimeout(r, 5));
      return v.name === 'taken' ? ({ name: 'Username taken' } as any) : {};
    };
    const onValid = vi.fn();
    const { result } = renderHook(() =>
      useForm<Values>({ defaultValues: { ...defaults, name: 'taken' }, resolver: asyncResolver }),
    );
    await act(async () => {
      await result.current.handleSubmit(onValid)();
    });
    expect(onValid).not.toHaveBeenCalled();
    expect(result.current.errors.name).toBe('Username taken');
  });

  it('handleSubmit toggles isSubmitting around the async onValid', async () => {
    const { result } = renderHook(() => useForm<Values>({ defaultValues: defaults }));
    let resolveSubmit!: () => void;
    const slow = new Promise<void>((r) => (resolveSubmit = r));
    let submitPromise!: Promise<void>;
    act(() => {
      submitPromise = result.current.handleSubmit(async () => {
        await slow;
      })();
    });
    expect(result.current.isSubmitting).toBe(true);
    await act(async () => {
      resolveSubmit();
      await submitPromise;
    });
    expect(result.current.isSubmitting).toBe(false);
  });
});
