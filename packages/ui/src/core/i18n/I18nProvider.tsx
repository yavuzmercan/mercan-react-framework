import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { translate } from './format';
import type { FormatOptions, I18nResources, Locale, Messages } from './types';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  availableLocales: Locale[];
  t: (key: string, options?: FormatOptions) => string;
  formatNumber: (n: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (d: Date | number, options?: Intl.DateTimeFormatOptions) => string;
  registerMessages: (locale: Locale, messages: Messages) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export interface I18nProviderProps {
  children: ReactNode;
  resources: I18nResources;
  defaultLocale: Locale;
  fallbackLocale?: Locale;
}

export const I18nProvider = ({
  children,
  resources: initialResources,
  defaultLocale,
  fallbackLocale,
}: I18nProviderProps) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [resources, setResources] = useState<I18nResources>(initialResources);

  const t = useCallback(
    (key: string, options?: FormatOptions) => {
      const messages = resources[locale] ?? {};
      const fallback = fallbackLocale ? resources[fallbackLocale] : undefined;
      return translate(messages, fallback, key, options);
    },
    [resources, locale, fallbackLocale],
  );

  const formatNumber = useCallback(
    (n: number, options?: Intl.NumberFormatOptions) => new Intl.NumberFormat(locale, options).format(n),
    [locale],
  );

  const formatDate = useCallback(
    (d: Date | number, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(locale, options).format(d),
    [locale],
  );

  const registerMessages = useCallback((loc: Locale, messages: Messages) => {
    setResources((prev) => ({ ...prev, [loc]: { ...(prev[loc] ?? {}), ...messages } }));
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      availableLocales: Object.keys(resources),
      t,
      formatNumber,
      formatDate,
      registerMessages,
    }),
    [locale, resources, t, formatNumber, formatDate, registerMessages],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18nContext = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within <I18nProvider>');
  return ctx;
};
