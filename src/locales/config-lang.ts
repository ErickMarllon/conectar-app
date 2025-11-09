import {
  enUS,
  frFR,
  zhCN,
  viVN,
  deDE,
  esES,
  itIT,
  jaJP,
  koKR,
  ptPT,
  ptBR,
  ruRU,
} from '@mui/material/locale';
export interface IAllLangs {
  label: string;
  value: string;
  systemValue: any;
  icon: string;
  currency: string;
  currencySymbol?: string;
}

export const allLangs: Record<string, IAllLangs> = {
  'zh-CN': {
    label: 'Chinese',
    value: 'zh-CN',
    systemValue: zhCN,
    icon: '/assets/icons/flags/ic_flag_cn.svg',
    currency: 'CNY',
    currencySymbol: '¥',
  },
  'de-DE': {
    label: 'German',
    value: 'de-DE',
    systemValue: deDE,
    icon: '/assets/icons/flags/ic_flag_de.svg',
    currency: 'EUR',
    currencySymbol: '€',
  },
  'en-US': {
    label: 'English',
    value: 'en-US',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
    currency: 'USD',
    currencySymbol: '$',
  },
  'es-ES': {
    label: 'Spanish',
    value: 'es-ES',
    systemValue: esES,
    icon: '/assets/icons/flags/ic_flag_es.svg',
    currency: 'EUR',
    currencySymbol: '€',
  },
  'fr-FR': {
    label: 'French',
    value: 'fr-FR',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
    currency: 'EUR',
    currencySymbol: '€',
  },
  'it-IT': {
    label: 'Italian',
    value: 'it-IT',
    systemValue: itIT,
    icon: '/assets/icons/flags/ic_flag_it.svg',
    currency: 'EUR',
    currencySymbol: '€',
  },
  'ja-JP': {
    label: 'Japanese',
    value: 'ja-JP',
    systemValue: jaJP,
    icon: '/assets/icons/flags/ic_flag_jp.svg',
    currency: 'JPY',
    currencySymbol: '¥',
  },
  'ko-KR': {
    label: 'Korean',
    value: 'ko-KR',
    systemValue: koKR,
    icon: '/assets/icons/flags/ic_flag_ko.svg',
    currency: 'KRW',
    currencySymbol: '₩',
  },
  'pt-BR': {
    label: 'Portuguese-BR',
    value: 'pt-BR',
    systemValue: ptBR,
    icon: '/assets/icons/flags/ic_flag_pt-BR.svg',
    currency: 'BRL',
    currencySymbol: 'R$',
  },
  'pt-PT': {
    label: 'Portuguese',
    value: 'pt-PT',
    systemValue: ptPT,
    icon: '/assets/icons/flags/ic_flag_pt-PT.svg',
    currency: 'EUR',
    currencySymbol: '€',
  },
  'ru-RU': {
    label: 'Russian',
    value: 'ru-RU',
    systemValue: ruRU,
    icon: '/assets/icons/flags/ic_flag_ru.svg',
    currency: 'RUB',
    currencySymbol: '₽',
  },
  'vi-VN': {
    label: 'Vietnamese',
    value: 'vi-VN',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
    currency: 'VND',
    currencySymbol: '₫',
  },
};

export const defaultLang = allLangs['pt-BR']; // ou 'en-US', etc.
export const allLangsArray = Object.values(allLangs);
