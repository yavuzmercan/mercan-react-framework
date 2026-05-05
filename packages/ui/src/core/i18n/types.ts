export type Messages = Record<string, string | Record<string, string>>;

export type Locale = string;

export interface I18nResources {
  [locale: Locale]: Messages;
}

export interface FormatOptions {
  count?: number;
  [key: string]: string | number | undefined;
}
