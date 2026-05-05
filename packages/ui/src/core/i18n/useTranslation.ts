import { useI18nContext } from './I18nProvider';

export const useTranslation = () => {
  const { t, locale, setLocale, availableLocales, formatNumber, formatDate, registerMessages } =
    useI18nContext();
  return { t, locale, setLocale, availableLocales, formatNumber, formatDate, registerMessages };
};
