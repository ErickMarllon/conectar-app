import { handleError } from '@/errors/handleError';
import { ProductService } from '@/services/product/productService';
import type { IProduct } from '@/shared/interfaces/IProduct';
import { AxiosError } from 'axios';

export const productByQueryFn = async (id: string): Promise<IProduct> => {
  try {
    const response = await ProductService.getProduct(id);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleError({
      error: axiosError,
      customMessage: 'Ocorreu um Erro ao listar usuário ',
      returnBoolean: false,
    });

    throw axiosError;
  }
};
