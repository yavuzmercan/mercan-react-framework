import { useEffect, useRef } from 'react';

export interface HotkeyOptions {
  /** Run the handler even while typing in inputs/textarea. Defaults to false. */
  enableInInputs?: boolean;
  /** Prevent default browser behavior. Defaults to true. */
  preventDefault?: boolean;
  /** Disable the binding when false. Defaults to true. */
  enabled?: boolean;
}

const isEditable = (el: EventTarget | null): boolean => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
};

/** Modifiers in any order. e.g. "mod+k", "shift+/", "ctrl+shift+p". `mod` = ⌘ on Mac, Ctrl elsewhere. */
const parseCombo = (combo: string) => {
  const parts = combo.toLowerCase().split('+').map((p) => p.trim());
  const key = parts[parts.length - 1] ?? '';
  const mods = new Set(parts.slice(0, -1));
  return { key, mods };
};

const matches = (e: KeyboardEvent, combo: string): boolean => {
  const { key, mods } = parseCombo(combo);
  if (e.key.toLowerCase() !== key) return false;
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
  const ctrl = mods.has('ctrl') || (mods.has('mod') && !isMac);
  const meta = mods.has('meta') || (mods.has('mod') && isMac);
  if (ctrl !== e.ctrlKey) return false;
  if (meta !== e.metaKey) return false;
  if (mods.has('shift') !== e.shiftKey) return false;
  if (mods.has('alt') !== e.altKey) return false;
  return true;
};

/**
 * Bind a keyboard shortcut. Combo string: `"mod+k"`, `"shift+/"`, `"ctrl+shift+p"`.
 * `mod` is Ctrl on Windows/Linux and ⌘ on Mac.
 */
export const useHotkey = (
  combo: string | string[],
  handler: (e: KeyboardEvent) => void,
  options: HotkeyOptions = {},
) => {
  const { enableInInputs = false, preventDefault = true, enabled = true } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;
    const combos = Array.isArray(combo) ? combo : [combo];
    const onKey = (e: KeyboardEvent) => {
      if (!enableInInputs && isEditable(e.target)) return;
      for (const c of combos) {
        if (matches(e, c)) {
          if (preventDefault) e.preventDefault();
          handlerRef.current(e);
          return;
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [combo, enabled, enableInInputs, preventDefault]);
};
