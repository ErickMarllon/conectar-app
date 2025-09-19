import { handleError } from '@/errors/handleError';
import { ProductsService } from '@/services/products/productsService';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IProduct } from '@/shared/interfaces/IProduct';
import { AxiosError } from 'axios';
import type { useListProductsParams } from './type';

export const listProductsQueryFn = async (
  params: useListProductsParams, // params: Partial<IProduct>,
): Promise<IPaginatedResponse<IProduct>> => {
  try {
    const response = await ProductsService.list(params);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    handleError({
      error: axiosError,
      customMessage: 'Ocorreu um Erro ao listar Produtos',
    });

    throw axiosError;
  }
};
