import { CookiesService } from '@/services/cookies';
import i18n from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { defaultLang } from './config-lang';
import Backend from 'i18next-http-backend';

const savedLanguage = CookiesService.getItem('i18next') as string | undefined;
const initialLng = savedLanguage || defaultLang.value;
if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: defaultLang.value,
      debug: false,
      ns: ['nav', 'home', 'actions', 'pricingPlans'],
      defaultNS: 'nav',
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      cache: {
        enabled: true,
        expirationTime: 60 * 24 * 365,
      },
      lng: initialLng,
      interpolation: { escapeValue: false },
      detection: {
        order: ['cookie', 'localStorage', 'navigator'],
        caches: ['cookie', 'localStorage'],
        cookieMinutes: 60 * 24 * 365,
        cookieOptions: { path: '/' },
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        cookieDomain: window.location.hostname,
        lookupLocalStorage: 'i18next',
      },
    });
}
export default i18n;
