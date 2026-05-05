import { useCallback, useState } from 'react';

export interface CookieOptions {
  /** Days until expiration. */
  expires?: number;
  path?: string;
  domain?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
}

const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]!) : null;
};

const writeCookie = (name: string, value: string, options: CookieOptions = {}) => {
  if (typeof document === 'undefined') return;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (options.expires !== undefined) {
    const date = new Date();
    date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
    cookie += `; expires=${date.toUTCString()}`;
  }
  cookie += `; path=${options.path ?? '/'}`;
  if (options.domain) cookie += `; domain=${options.domain}`;
  if (options.sameSite) cookie += `; samesite=${options.sameSite}`;
  if (options.secure) cookie += '; secure';
  document.cookie = cookie;
};

const deleteCookie = (name: string, options: CookieOptions = {}) => {
  writeCookie(name, '', { ...options, expires: -1 });
};

/**
 * Read/write a cookie as React state.
 * Returns [value, setValue, remove].
 */
export const useCookie = (
  name: string,
  defaultValue?: string,
  defaultOptions?: CookieOptions,
): [string | null, (value: string, options?: CookieOptions) => void, () => void] => {
  const [value, setValue] = useState<string | null>(() => readCookie(name) ?? defaultValue ?? null);

  const set = useCallback(
    (next: string, options?: CookieOptions) => {
      writeCookie(name, next, { ...defaultOptions, ...options });
      setValue(next);
    },
    [name, defaultOptions],
  );

  const remove = useCallback(() => {
    deleteCookie(name, defaultOptions);
    setValue(null);
  }, [name, defaultOptions]);

  return [value, set, remove];
};
