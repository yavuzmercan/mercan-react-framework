import { createContext, useContext, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../core';

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
  registerTab: (value: string, el: HTMLButtonElement | null) => void;
  focusTab: (value: string) => void;
  tabValuesRef: React.MutableRefObject<string[]>;
}
const TabsContext = createContext<TabsCtx | null>(null);
const useTabsCtx = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs components must be used inside <Tabs>');
  return ctx;
};

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export const Tabs = ({ value: controlled, defaultValue, onChange, children, className }: TabsProps) => {
  const [internal, setInternal] = useState(defaultValue ?? '');
  const value = controlled ?? internal;
  const tabsMap = useRef(new Map<string, HTMLButtonElement>());
  const tabValuesRef = useRef<string[]>([]);

  const setValue = (v: string) => {
    if (controlled === undefined) setInternal(v);
    onChange?.(v);
  };

  const registerTab = (val: string, el: HTMLButtonElement | null) => {
    if (el) {
      tabsMap.current.set(val, el);
      if (!tabValuesRef.current.includes(val)) tabValuesRef.current.push(val);
    } else {
      tabsMap.current.delete(val);
      tabValuesRef.current = tabValuesRef.current.filter((x) => x !== val);
    }
  };

  const focusTab = (val: string) => {
    const el = tabsMap.current.get(val);
    el?.focus();
  };

  return (
    <TabsContext.Provider value={{ value, setValue, registerTab, focusTab, tabValuesRef }}>
      <div className={cx('mf-tabs', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cx('mf-tablist', className)} role="tablist">
    {children}
  </div>
);

export interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Tab = ({ value, disabled, className, children }: TabProps) => {
  const ctx = useTabsCtx();
  const active = ctx.value === value;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const values = ctx.tabValuesRef.current;
    const idx = values.indexOf(value);
    if (idx === -1) return;
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % values.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + values.length) % values.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = values.length - 1;
    if (nextIdx !== null) {
      e.preventDefault();
      const nextVal = values[nextIdx];
      if (nextVal) {
        ctx.setValue(nextVal);
        ctx.focusTab(nextVal);
      }
    }
  };

  return (
    <button
      ref={(el) => ctx.registerTab(value, el)}
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      disabled={disabled}
      className={cx('mf-tab', 'mf-focus-ring', className)}
      data-active={active ? 'true' : undefined}
      onClick={() => ctx.setValue(value)}
      onKeyDown={onKey}
    >
      {children}
    </button>
  );
};

export interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabPanel = ({ value, className, children }: TabPanelProps) => {
  const ctx = useTabsCtx();
  if (ctx.value !== value) return null;
  return (
    <div role="tabpanel" className={cx('mf-tabpanel', className)} tabIndex={0}>
      {children}
    </div>
  );
};
