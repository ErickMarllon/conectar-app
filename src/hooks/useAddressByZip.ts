import axios from 'axios';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export type Address = {
  street: string;
  complement: string;
  city: string;
  state: string;
  country: string;
  neighborhood: string;
  zip_code: string;
};

type FetchAddressParams = {
  zip?: string;
  showToast?: boolean;
};

type IAddressByZip = {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  estado: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  regiao: string;
  siafi: string;
  uf: string;
  unidade: string;
  erro?: boolean;
};

const cepRegex = /^[0-9]{8}$/;

export const useFetchAddressByZip = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAddress = useCallback(async ({ zip, showToast = true }: FetchAddressParams) => {
    if (!zip) return null;

    const normalizedZip = zip.replace(/\D/g, '');
    if (!cepRegex.test(normalizedZip)) return null;

    setLoading(true);
    try {
      const { data } = await axios.get<IAddressByZip>(
        `https://viacep.com.br/ws/${normalizedZip}/json/`,
      );

      if (!data || data.erro) throw new Error('CEP não encontrado');

      const fetchedAddress: Address = {
        street: data.logradouro ?? '',
        neighborhood: data.bairro ?? '',
        zip_code: data.cep ?? '',
        complement: data.complemento ?? '',
        city: data.localidade ?? '',
        state: data.uf ?? '',
        country: 'Brasil',
      };

      setAddress(fetchedAddress);
      return fetchedAddress;
    } catch (_error) {
      if (showToast) toast.error('CEP inválido ou não encontrado');
      setAddress(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { address, fetchAddress, loading };
};
