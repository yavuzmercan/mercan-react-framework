import { useEffect, useState } from 'react';
import { MercanProvider, BackToTop, useBreakpointDown, useLocalStorage } from '@yavuzmercan/ui';
import { MenuIcon, X } from '@yavuzmercan/ui/icons';
import { HashRouter, useRouter } from './router';
import { ROUTES } from './routes';
import { PAGES } from './pages';
import { ThemeBuilderPage } from './pages/ThemeBuilder';
import { ThemeCustomizer, type CustomizerState, DEFAULT_CUSTOMIZER } from './ThemeCustomizer';

const resources = {
  en: {
    'docs.demoGreet': 'Hello, {name}!',
  },
  tr: {
    'docs.demoGreet': 'Merhaba, {name}!',
  },
};

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
  const { path, navigate } = useRouter();
  return (
    <nav className="docs-side" data-mobile-open={mobileOpen ? 'true' : undefined}>
      {ROUTES.map((section) => (
        <div key={section.section}>
          <div className="docs-section-title">{section.section}</div>
          {section.entries.map((entry) => (
            <button
              key={entry.path}
              type="button"
              className="docs-nav-link"
              data-active={path === entry.path ? 'true' : undefined}
              onClick={() => {
                navigate(entry.path);
                onClose();
              }}
            >
              {entry.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
};

const Page = ({
  state,
  onChange,
}: {
  state: CustomizerState;
  onChange: (s: CustomizerState) => void;
}) => {
  const { path } = useRouter();
  if (path === '/builder') {
    return (
      <main className="docs-main">
        <div className="docs-main-inner">
          <ThemeBuilderPage state={state} onChange={onChange} />
        </div>
      </main>
    );
  }
  const Component = PAGES[path] ?? PAGES['/']!;
  return (
    <main className="docs-main">
      <div className="docs-main-inner">
        <Component />
      </div>
    </main>
  );
};

const Logo = () => (
  <div className="docs-logo">
    <div
      style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'var(--mf-color-primary)',
        display: 'grid', placeItems: 'center',
        color: 'var(--mf-color-primaryContrast)',
        fontWeight: 700, fontSize: 14,
      }}
    >M</div>
    <span>Mercan UI</span>
  </div>
);

const Shell = ({ state, setState }: { state: CustomizerState; setState: (s: CustomizerState) => void }) => {
  const isMobile = useBreakpointDown('md');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    if (isMobile) setMobileSidebarOpen(false);
  }, [path, isMobile]);

  useEffect(() => {
    if (!isMobile) setMobileSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="docs-shell">
      <Logo />
      <div className="docs-top">
        <button
          type="button"
          className="docs-hamburger"
          onClick={() => setMobileSidebarOpen((v) => !v)}
          aria-label={mobileSidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileSidebarOpen ? <X size={18} /> : <MenuIcon size={18} />}
        </button>
        <ThemeCustomizer state={state} onChange={setState} />
      </div>
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div
        className="docs-side-overlay"
        data-mobile-open={mobileSidebarOpen ? 'true' : undefined}
        onClick={() => setMobileSidebarOpen(false)}
      />
      <Page state={state} onChange={setState} />
    </div>
  );
};

export const App = () => {
  const [customizer, setCustomizer] = useLocalStorage<CustomizerState>(
    'mf-docs-customizer',
    DEFAULT_CUSTOMIZER,
    {
      // Forward-compatible: merge persisted shape onto defaults so old keys
      // missing the new fields (darkPrimary/darkSecondary/preset) still work.
      deserialize: (raw) => ({ ...DEFAULT_CUSTOMIZER, ...(JSON.parse(raw) as Partial<CustomizerState>) }),
    },
  );

  const radiiOverride = {
    sm: `${Math.max(2, customizer.radius - 4)}px`,
    md: `${customizer.radius}px`,
    lg: `${customizer.radius + 4}px`,
    xl: `${customizer.radius + 8}px`,
  };

  const isSystem = customizer.font === 'System';
  const darkBrand = customizer.darkPrimary || customizer.darkSecondary
    ? {
        primary: customizer.darkPrimary || customizer.primary,
        secondary: customizer.darkSecondary || customizer.secondary,
      }
    : undefined;

  return (
    <MercanProvider
      defaultColorMode="light"
      locale="en"
      fallbackLocale="en"
      resources={resources}
      preset={customizer.preset === 'system' ? undefined : customizer.preset}
      brand={{ primary: customizer.primary, secondary: customizer.secondary }}
      darkBrand={darkBrand}
      googleFonts={isSystem ? undefined : { body: customizer.font, heading: customizer.font }}
      lightOverride={{ radii: radiiOverride }}
      darkOverride={{ radii: radiiOverride }}
    >
      <HashRouter>
        <Shell state={customizer} setState={setCustomizer} />
        <BackToTop threshold={200} />
      </HashRouter>
    </MercanProvider>
  );
};
