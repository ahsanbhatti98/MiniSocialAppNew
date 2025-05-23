import {useTranslation} from 'react-i18next';

export enum LanguageCode {
  en = 'en',
  es = 'es',
}

export const useLanguage = () => {
  const {i18n} = useTranslation();

  const changeLanguage = (lang: LanguageCode) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language;

  return {
    changeLanguage,
    currentLanguage,
  };
};
