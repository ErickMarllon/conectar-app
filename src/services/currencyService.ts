import axios from 'axios';

export interface ExchangeRates {
  BRL: number;
  USD: number;
  EUR: number;
  GBP: number;
  JPY: number;
  CAD: number;
  AUD: number;
  CHF: number;
  CNY: number;
  KRW: number;
  RUB: number;
  VND: number;
}

export interface CurrencyResponse {
  amount: number;
  base: string;
  date: string;
  rates: ExchangeRates;
}

export const getExchangeRates = async (baseCurrency: string = 'BRL'): Promise<ExchangeRates> => {
  try {
    const response = await axios.get<CurrencyResponse>(
      `https://api.frankfurter.app/latest?from=${baseCurrency}`,
    );

    return response.data.rates;
  } catch (error) {
    console.warn('Erro ao buscar taxas da Frankfurter, usando fallback:', error);
    return getFallbackRates();
  }
};

const getFallbackRates = (): ExchangeRates => ({
  BRL: 1,
  USD: 0.18,
  EUR: 0.17,
  GBP: 0.15,
  JPY: 26.5,
  CAD: 0.24,
  AUD: 0.27,
  CHF: 0.16,
  CNY: 1.3,
  KRW: 240.0,
  RUB: 16.5,
  VND: 4500.0,
});

let ratesCache: ExchangeRates | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 60 * 1000;

export const getCachedRates = async (): Promise<ExchangeRates> => {
  const now = Date.now();

  if (ratesCache && now - cacheTimestamp < CACHE_DURATION) {
    return ratesCache;
  }

  ratesCache = await getExchangeRates('BRL');
  cacheTimestamp = now;
  return ratesCache;
};
