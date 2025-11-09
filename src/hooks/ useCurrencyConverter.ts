import { allLangsArray, defaultLang } from '@/locales/config-lang';
import { getCachedRates, type ExchangeRates } from '@/services/currencyService';
import { useState, useEffect } from 'react';

interface UseCurrencyConverterReturn {
  rates: ExchangeRates | null;
  loading: boolean;
  error: string | null;
  convert: (amount: number, fromCurrency: string, toCurrency: string) => number;
  formatCurrency: (amount: number, currency: string, locale: string) => string;
  refreshRates: () => Promise<void>;
}

export const useCurrencyConverter = (): UseCurrencyConverterReturn => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      setError(null);
      const exchangeRates = await getCachedRates();
      setRates(exchangeRates);
    } catch (err) {
      setError('Erro ao carregar taxas de câmbio');
      console.error('Currency conversion error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();

    const interval = setInterval(fetchRates, 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convert = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (!rates || fromCurrency === toCurrency) return amount;

    try {
      let amountInBRL = amount;
      if (fromCurrency !== 'BRL') {
        const rateFrom = rates[fromCurrency as keyof ExchangeRates];
        if (!rateFrom) return amount;
        amountInBRL = amount / rateFrom;
      }

      if (toCurrency === 'BRL') {
        return Number(amountInBRL.toFixed(2));
      }

      const rateTo = rates[toCurrency as keyof ExchangeRates];
      if (!rateTo) return amount;

      const convertedAmount = amountInBRL * rateTo;
      return Number(convertedAmount.toFixed(2));
    } catch (err) {
      console.error('Conversion error:', err);
      return amount;
    }
  };
  const getCurrencySymbol = (currency: string): string => {
    const foundLang = allLangsArray.find((lang) => lang.currency === currency) ?? defaultLang;

    return foundLang?.currencySymbol ?? currency;
  };

  const formatCurrency = (amount: number, currency: string, locale: string): string => {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (_err) {
      const symbol = getCurrencySymbol(currency);
      return `${symbol} ${amount.toFixed(2)}`;
    }
  };

  return {
    rates,
    loading,
    error,
    convert,
    formatCurrency,
    refreshRates: fetchRates,
  };
};
