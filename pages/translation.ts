import useLocale from './useLocale';
type LocaleTypes = 'en-US' | 'zh-CN';

type LocaleMessages<T extends Record<string, any>> = {
  [K in LocaleTypes]: T;
};

type TranslationFunction<T extends Record<string, any>> = (key: keyof T) => string;

export function genUseTranslation<T extends Record<string, any>>(config: LocaleMessages<T>) {
  return function useTranslation(): { t: TranslationFunction<T> } {
    const currentLocale = useLocale();

    function t(key: keyof T): string {
      const localeTranslations = config[currentLocale] || config['en-US'];
      return localeTranslations[key] ?? key;
    }

    return { t };
  };
}
