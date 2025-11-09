// components
import { useThemesStore } from '@/stores/themes.store';
//
import { allLangs, defaultLang, type IAllLangs } from '@/locales/config-lang';
import type { ThemeLangs } from '@/components/settings/types';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------
function ChangeLng(lang?: string | null): IAllLangs {
  if (!lang) return defaultLang;
  return allLangs[lang] || defaultLang;
}

export default function useLocales() {
  const { setLanguage, language } = useThemesStore();
  const { i18n, t: translate } = useTranslation();

  const onChangeLang = (newlang: ThemeLangs) => {
    const lang = ChangeLng(newlang);
    document.documentElement.lang = lang.value;
    i18n.changeLanguage(lang.value);
    setLanguage(lang.value);
  };

  return {
    onChangeLang,
    translate,
    currentLang: ChangeLng(language),
    allLangs,
    i18n,
  };
}
