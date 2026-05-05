import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface RouterValue {
  path: string;
  navigate: (path: string) => void;
}
const RouterContext = createContext<RouterValue | null>(null);

const readHash = () => {
  if (typeof window === 'undefined') return '/';
  const h = window.location.hash.replace(/^#/, '');
  return h || '/';
};

export const HashRouter = ({ children }: { children: ReactNode }) => {
  const [path, setPath] = useState(readHash);

  useEffect(() => {
    const onHash = () => setPath(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (p: string) => {
    if (p === path) return;
    window.location.hash = p;
  };

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
};

export const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside <HashRouter>');
  return ctx;
};
