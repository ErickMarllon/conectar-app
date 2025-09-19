import axios from 'axios';
import { toast } from 'react-toastify';

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

export const fetchAddressByZip = async (zip: string) => {
  try {
    const validacep = /^[0-9]{8}$/;
    const normalizedZip = zip.replace('-', '').trim();
    if (!validacep.test(normalizedZip)) return null;

    const { data } = await axios.get<IAddressByZip>(
      `https://viacep.com.br/ws/${normalizedZip}/json/`,
    );

    if (!data || data.erro) throw new Error('CEP não encontrado');

    return {
      neighborhood: data.bairro ?? '',
      zip: data.cep ?? '',
      ddd: data.ddd ?? '',
      complement: data.complemento ?? '',
      street: data.logradouro ?? '',
      city: data.localidade ?? '',
      state: data.uf ?? '',
      country: 'Brasil',
    };
  } catch (_error) {
    toast.error('CEP inválido ou não encontrado');
    return null;
  }
};
