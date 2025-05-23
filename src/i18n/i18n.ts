import i18n, {ModuleType} from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: {translation: en},
  es: {translation: es},
};

const languageDetector = {
  type: 'languageDetector' as ModuleType,
  async: true,
  detect: (cb: (lang: string) => void) => {
    const locales = RNLocalize.getLocales();
    cb(locales[0]?.languageCode || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    // Removed compatibilityJSON as it is not valid in the current version
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
