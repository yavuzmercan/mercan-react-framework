import { useState } from 'react';
import { MercanProvider, BackToTop } from '@yavuzmercan/ui';
import { HashRouter, useRouter } from './router';
import { ROUTES } from './routes';
import { PAGES } from './pages';
import { ThemeCustomizer, type CustomizerState } from './ThemeCustomizer';

const resources = {
  en: {
    'docs.demoGreet': 'Hello, {name}!',
  },
  tr: {
    'docs.demoGreet': 'Merhaba, {name}!',
  },
};

const Sidebar = () => {
  const { path, navigate } = useRouter();
  return (
    <nav className="docs-side">
      {ROUTES.map((section) => (
        <div key={section.section}>
          <div className="docs-section-title">{section.section}</div>
          {section.entries.map((entry) => (
            <button
              key={entry.path}
              type="button"
              className="docs-nav-link"
              data-active={path === entry.path ? 'true' : undefined}
              onClick={() => navigate(entry.path)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
};

const Page = () => {
  const { path } = useRouter();
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

const Shell = ({ state, setState }: { state: CustomizerState; setState: (s: CustomizerState) => void }) => (
  <div className="docs-shell">
    <Logo />
    <div className="docs-top">
      <ThemeCustomizer state={state} onChange={setState} />
    </div>
    <Sidebar />
    <Page />
  </div>
);

export const App = () => {
  const [customizer, setCustomizer] = useState<CustomizerState>({
    primary: '#3b6cff',
    secondary: '#6b7280',
    radius: 8,
    font: 'Inter',
  });

  const radiiOverride = {
    sm: `${Math.max(2, customizer.radius - 4)}px`,
    md: `${customizer.radius}px`,
    lg: `${customizer.radius + 4}px`,
    xl: `${customizer.radius + 8}px`,
  };

  const isSystem = customizer.font === 'System';

  return (
    <MercanProvider
      defaultColorMode="light"
      locale="en"
      fallbackLocale="en"
      resources={resources}
      brand={{ primary: customizer.primary, secondary: customizer.secondary }}
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
