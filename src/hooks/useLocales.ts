import { useTranslation } from 'react-i18next';
// components
import { useThemesStore } from '@/stores/themes.store';
//
import { allLangs, defaultLang } from '@/locales/config-lang';
import type { ThemeLangs } from '@/components/settings/types';
import { CookiesService } from '@/services/cookies';

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const { setLanguage, language } = useThemesStore();

  const langStorage = language ? CookiesService.getItem('i18nextLng') : '';

  const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  const handleChangeLanguage = (newlang: ThemeLangs) => {
    i18n.changeLanguage(newlang);
    setLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => translate(text, options),
    currentLang,
    allLangs,
  };
}
