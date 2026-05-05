import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import {
  useToggle,
  useBoolean,
  useCounter,
  useArray,
  usePrevious,
  useStateHistory,
  useStep,
  useLocalStorage,
  useSessionStorage,
  useDebounce,
  useDebouncedCallback,
  useThrottle,
  useNow,
} from '../../core/hooks';

describe('useToggle', () => {
  it('toggles, sets explicit value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1](false));
    expect(result.current[0]).toBe(false);
  });
});

describe('useBoolean', () => {
  it('exposes setTrue/setFalse/toggle', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current.value).toBe(false);
    act(() => result.current.setTrue());
    expect(result.current.value).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.value).toBe(false);
    act(() => result.current.setFalse());
    expect(result.current.value).toBe(false);
  });
});

describe('useCounter', () => {
  it('increments/decrements within bounds', () => {
    const { result } = renderHook(() => useCounter(5, { min: 0, max: 10 }));
    expect(result.current.count).toBe(5);
    act(() => result.current.increment(3));
    expect(result.current.count).toBe(8);
    act(() => result.current.increment(50));
    expect(result.current.count).toBe(10); // clamped
    act(() => result.current.decrement(20));
    expect(result.current.count).toBe(0); // clamped
    act(() => result.current.set(7));
    expect(result.current.count).toBe(7);
    act(() => result.current.reset());
    expect(result.current.count).toBe(5);
  });
});

describe('useArray', () => {
  it('mutates immutably', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]));
    act(() => result.current.push(4));
    expect(result.current.array).toEqual([1, 2, 3, 4]);
    act(() => result.current.removeAt(0));
    expect(result.current.array).toEqual([2, 3, 4]);
    act(() => result.current.insertAt(1, 99));
    expect(result.current.array).toEqual([2, 99, 3, 4]);
    act(() => result.current.replaceAt(1, 50));
    expect(result.current.array).toEqual([2, 50, 3, 4]);
    act(() => result.current.clear());
    expect(result.current.array).toEqual([]);
  });
});

describe('usePrevious', () => {
  it('returns the previous value across renders', () => {
    const { result, rerender } = renderHook(({ v }) => usePrevious(v), { initialProps: { v: 1 } });
    expect(result.current).toBeUndefined();
    rerender({ v: 2 });
    expect(result.current).toBe(1);
    rerender({ v: 3 });
    expect(result.current).toBe(2);
  });
});

describe('useStateHistory', () => {
  it('undo and redo through history', () => {
    const { result } = renderHook(() => useStateHistory<number>(0));
    act(() => result.current.set(1));
    act(() => result.current.set(2));
    act(() => result.current.set(3));
    expect(result.current.value).toBe(3);
    expect(result.current.canUndo).toBe(true);

    act(() => result.current.undo());
    expect(result.current.value).toBe(2);
    act(() => result.current.undo());
    expect(result.current.value).toBe(1);
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.redo());
    expect(result.current.value).toBe(2);
  });
});

describe('useStep', () => {
  it('navigates within bounds and reports edges', () => {
    const { result } = renderHook(() => useStep(3));
    expect(result.current.step).toBe(0);
    expect(result.current.isFirst).toBe(true);
    act(() => result.current.next());
    expect(result.current.step).toBe(1);
    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.step).toBe(2);
    expect(result.current.isLast).toBe(true);
    act(() => result.current.prev());
    expect(result.current.step).toBe(1);
  });
});

describe('useLocalStorage', () => {
  beforeEach(() => localStorage.clear());

  it('reads and writes JSON values', () => {
    const { result } = renderHook(() => useLocalStorage('mf-test', { count: 0 }));
    expect(result.current[0]).toEqual({ count: 0 });
    act(() => result.current[1]({ count: 5 }));
    expect(result.current[0]).toEqual({ count: 5 });
    expect(JSON.parse(localStorage.getItem('mf-test')!)).toEqual({ count: 5 });
  });

  it('hydrates from existing storage', () => {
    localStorage.setItem('mf-test-2', JSON.stringify({ name: 'Ada' }));
    const { result } = renderHook(() => useLocalStorage('mf-test-2', { name: '' }));
    expect(result.current[0]).toEqual({ name: 'Ada' });
  });

  it('removes the value', () => {
    localStorage.setItem('mf-test-3', JSON.stringify(true));
    const { result } = renderHook(() => useLocalStorage('mf-test-3', false));
    act(() => result.current[2]());
    expect(localStorage.getItem('mf-test-3')).toBeNull();
    expect(result.current[0]).toBe(false);
  });
});

describe('useSessionStorage', () => {
  beforeEach(() => sessionStorage.clear());
  it('persists in session storage', () => {
    const { result } = renderHook(() => useSessionStorage('mf-s', 'a'));
    act(() => result.current[1]('b'));
    expect(sessionStorage.getItem('mf-s')).toBe(JSON.stringify('b'));
  });
});

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('delays value updates', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 100), {
      initialProps: { v: 'a' },
    });
    expect(result.current).toBe('a');
    rerender({ v: 'b' });
    expect(result.current).toBe('a');
    act(() => {
      vi.advanceTimersByTime(99);
    });
    expect(result.current).toBe('a');
    act(() => {
      vi.advanceTimersByTime(2);
    });
    expect(result.current).toBe('b');
  });
});

describe('useDebouncedCallback', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('coalesces rapid calls into one', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(fn, 50));
    act(() => {
      result.current('a');
      result.current('b');
      result.current('c');
    });
    expect(fn).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('c');
  });

  it('cancel prevents pending call', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(fn, 50));
    act(() => {
      result.current('x');
      result.current.cancel();
      vi.advanceTimersByTime(100);
    });
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('useThrottle', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('caps update rate', () => {
    const { result, rerender } = renderHook(({ v }) => useThrottle(v, 100), {
      initialProps: { v: 1 },
    });
    expect(result.current).toBe(1);
    rerender({ v: 2 });
    rerender({ v: 3 });
    rerender({ v: 4 });
    // Initial value still in throttle window
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe(4);
  });
});

describe('useNow', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('updates over time', () => {
    const { result } = renderHook(() => useNow(1000));
    const first = result.current.getTime();
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(result.current.getTime()).toBeGreaterThan(first);
  });
});
