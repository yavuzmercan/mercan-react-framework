import { useEffect, useState } from 'react';

export type PermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported' | 'unknown';

/** Subscribe to a Permissions API permission state. */
export const usePermission = (
  name: PermissionName | { name: PermissionName },
): PermissionState => {
  const [state, setState] = useState<PermissionState>('unknown');

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      setState('unsupported');
      return;
    }
    let cancelled = false;
    let status: PermissionStatus | null = null;
    const onChange = () => {
      if (!cancelled && status) setState(status.state as PermissionState);
    };

    navigator.permissions
      .query(typeof name === 'string' ? { name } : name)
      .then((s) => {
        if (cancelled) return;
        status = s;
        setState(s.state as PermissionState);
        s.addEventListener('change', onChange);
      })
      .catch(() => setState('unsupported'));

    return () => {
      cancelled = true;
      status?.removeEventListener('change', onChange);
    };
  }, [name]);

  return state;
};
