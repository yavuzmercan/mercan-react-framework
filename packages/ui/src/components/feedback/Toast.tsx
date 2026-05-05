import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../core';

export type ToastStatus = 'info' | 'success' | 'warning' | 'danger';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastInput {
  title?: ReactNode;
  message?: ReactNode;
  status?: ToastStatus;
  duration?: number;
}

interface InternalToast extends ToastInput {
  id: number;
}

interface ToastContextValue {
  show: (toast: ToastInput) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  defaultDuration?: number;
}

export const ToastProvider = ({ children, position = 'top-right', defaultDuration = 4000 }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<InternalToast[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (toast: ToastInput) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { id, ...toast }]);
      const dur = toast.duration ?? defaultDuration;
      if (dur > 0) {
        window.setTimeout(() => dismiss(id), dur);
      }
      return id;
    },
    [dismiss, defaultDuration],
  );

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="mf-toast-region" data-position={position}>
            {toasts.map((t) => (
              <div key={t.id} className={cx('mf-toast')} data-scheme={t.status}>
                <div style={{ flex: 1 }}>
                  {t.title && <div className="mf-toast-title">{t.title}</div>}
                  {t.message && <div className="mf-toast-msg">{t.message}</div>}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss"
                  style={{ background: 'transparent', border: 0, cursor: 'pointer', color: 'inherit', fontSize: '16px' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};
