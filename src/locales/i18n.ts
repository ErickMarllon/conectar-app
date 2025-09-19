import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// utils
import { defaultLang } from './config-lang';
//
import enLocales from './langs/en';
import frLocales from './langs/fr';
import vnLocales from './langs/vn';
import cnLocales from './langs/cn';
import arLocales from './langs/ar';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      fr: { translations: frLocales },
      vn: { translations: vnLocales },
      cn: { translations: cnLocales },
      ar: { translations: arLocales },
    },
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: { escapeValue: false },
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
      cookieDomain: window.location.hostname,
      cookieMinutes: 60 * 24 * 365,
      cookieOptions: { path: '/' },
    },
  });

export default i18n;
