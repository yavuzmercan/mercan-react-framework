type ClassValue = string | number | null | false | undefined | Record<string, unknown> | ClassValue[];

export const cx = (...args: ClassValue[]): string => {
  const out: string[] = [];
  for (const a of args) {
    if (!a) continue;
    if (typeof a === 'string' || typeof a === 'number') {
      out.push(String(a));
    } else if (Array.isArray(a)) {
      const inner = cx(...a);
      if (inner) out.push(inner);
    } else if (typeof a === 'object') {
      for (const key in a) if (a[key]) out.push(key);
    }
  }
  return out.join(' ');
};
