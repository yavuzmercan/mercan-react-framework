import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider, useTranslation } from '../../core';

const Demo = () => {
  const { t, locale, setLocale } = useTranslation();
  return (
    <div>
      <p data-testid="msg">{t('hello', { name: 'Ada' })}</p>
      <p data-testid="items">{t('items', { count: 3 })}</p>
      <p data-testid="missing">{t('nope')}</p>
      <p data-testid="locale">{locale}</p>
      <button onClick={() => setLocale('tr')}>TR</button>
    </div>
  );
};

const resources = {
  en: {
    hello: 'Hello, {name}!',
    items: '{count} item|{count} items',
  },
  tr: {
    hello: 'Merhaba, {name}!',
  },
};

describe('I18n', () => {
  it('interpolates and pluralizes', () => {
    render(
      <I18nProvider resources={resources} defaultLocale="en">
        <Demo />
      </I18nProvider>,
    );
    expect(screen.getByTestId('msg')).toHaveTextContent('Hello, Ada!');
    expect(screen.getByTestId('items')).toHaveTextContent('3 items');
  });

  it('returns key as fallback for missing translation', () => {
    render(
      <I18nProvider resources={resources} defaultLocale="en">
        <Demo />
      </I18nProvider>,
    );
    expect(screen.getByTestId('missing')).toHaveTextContent('nope');
  });

  it('switches locale', async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider resources={resources} defaultLocale="en" fallbackLocale="en">
        <Demo />
      </I18nProvider>,
    );
    await user.click(screen.getByText('TR'));
    expect(screen.getByTestId('msg')).toHaveTextContent('Merhaba, Ada!');
  });

  it('falls back to fallbackLocale when key missing in active locale', async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider resources={resources} defaultLocale="en" fallbackLocale="en">
        <Demo />
      </I18nProvider>,
    );
    await user.click(screen.getByText('TR'));
    // 'items' only exists in en — should fall back
    expect(screen.getByTestId('items')).toHaveTextContent('3 items');
  });
});
