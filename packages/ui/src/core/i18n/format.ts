import type { FormatOptions, Messages } from './types';

const lookup = (messages: Messages, key: string): string | undefined => {
  if (key in messages) {
    const v = messages[key];
    if (typeof v === 'string') return v;
  }
  const parts = key.split('.');
  let cur: any = messages;
  for (const part of parts) {
    if (cur && typeof cur === 'object' && part in cur) {
      cur = cur[part];
    } else {
      return undefined;
    }
  }
  return typeof cur === 'string' ? cur : undefined;
};

const interpolate = (template: string, params?: FormatOptions): string => {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = params[key];
    return v === undefined || v === null ? `{${key}}` : String(v);
  });
};

const pickPlural = (template: string, count: number): string => {
  const branches = template.split('|').map((b) => b.trim());
  if (branches.length < 2) return template;
  return count === 1 ? branches[0]! : (branches[1] ?? branches[0]!);
};

export const translate = (
  messages: Messages,
  fallbackMessages: Messages | undefined,
  key: string,
  options?: FormatOptions,
): string => {
  let raw = lookup(messages, key);
  if (raw === undefined && fallbackMessages) raw = lookup(fallbackMessages, key);
  if (raw === undefined) return key;
  if (options && typeof options.count === 'number') {
    raw = pickPlural(raw, options.count);
  }
  return interpolate(raw, options);
};
