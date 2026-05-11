import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { MercanProvider } from '../src/components/MercanProvider';
import '../src/styles.css';

const resources = {
  en: {
    actions: { save: 'Save', cancel: 'Cancel' },
    form: { name: 'Name', email: 'Email' },
  },
  tr: {
    actions: { save: 'Kaydet', cancel: 'İptal' },
    form: { name: 'Ad', email: 'E-posta' },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'padded',
    a11y: {
      element: '#storybook-root',
      manual: false,
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Foundations',
          'Layout',
          'Forms',
          'Display',
          'Feedback',
          'Navigation',
          'Hooks',
        ],
      },
    },
  },
  decorators: [
    // Light/dark switcher in the toolbar (writes data-mf-color-mode on <html>).
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-mf-color-mode',
    }),
    // Wrap every story in the framework's providers so theme tokens, i18n,
    // and toasts are available without per-story boilerplate.
    (Story, context) => (
      <MercanProvider
        defaultColorMode={(context.globals as any).theme === 'dark' ? 'dark' : 'light'}
        locale="en"
        fallbackLocale="en"
        resources={resources as any}
        persistColorMode={false}
      >
        <Story />
      </MercanProvider>
    ),
  ],
};

export default preview;
