import { useEffect, useState } from 'react';

export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

/** Dynamically load an external <script>. Multiple components requesting the same URL share one tag. */
export const useScript = (src: string | null, attributes: Record<string, string> = {}): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src || typeof document === 'undefined') {
      setStatus('idle');
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (script) {
      const existing = script.dataset.status as ScriptStatus | undefined;
      setStatus(existing ?? 'ready');
    } else {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.dataset.status = 'loading';
      Object.entries(attributes).forEach(([k, v]) => script!.setAttribute(k, v));
      document.body.appendChild(script);
      setStatus('loading');
    }

    const setReady = () => {
      script!.dataset.status = 'ready';
      setStatus('ready');
    };
    const setErr = () => {
      script!.dataset.status = 'error';
      setStatus('error');
    };
    script.addEventListener('load', setReady);
    script.addEventListener('error', setErr);

    return () => {
      script?.removeEventListener('load', setReady);
      script?.removeEventListener('error', setErr);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return status;
};
