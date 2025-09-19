import type { AxiosResponse } from 'axios';
import type { IProduct } from '@/shared/interfaces/IProduct';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { useListProductsParams } from '@/queries/products/useList/type';
import { products } from '@/_mock/_products';

class ProductsService {
  public static async list(
    params?: useListProductsParams,
  ): Promise<AxiosResponse<IPaginatedResponse<IProduct>>> {
    const { limit = 10, page = 1, orderBy, filters, sortBy, cursor, searchTerm } = params || {};

    // return await api.get<IPaginatedResponse<IProduct>>(`/products`, {
    //   params: {
    //     ...(searchTerm ? { searchTerm } : {}),
    //     ...(filters ? { ...filters } : {}),
    //   },
    //   headers: {
    //     'rest-mode': 'offset',
    //     ...(orderBy ? { 'rest-order': orderBy } : {}),
    //     ...(sortBy ? { 'rest-sort': JSON.stringify(sortBy) } : {}),
    //     ...(page ? { 'rest-offset': page } : {}),
    //     ...(limit ? { 'rest-limit': limit } : {}),
    //     ...(cursor ? { 'rest-cursor': cursor } : {}),
    //   },
    // });
    await new Promise((resolve) => setTimeout(resolve, 500));
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = products.slice(start, end) as IProduct[];
    const totalPages = Math.ceil(products.length / limit);
    return {
      data: {
        data: paginatedData,
        meta: {
          currentPage: page,
          limit,
          totalPages,
          nextPage: page < totalPages ? page + 1 : undefined,
          previousPage: page > 1 ? page - 1 : undefined,
          totalRecords: products.length,
        },
      },
      status: 200,
      statusText: 'OK',

      headers: {} as any,
      config: {} as any,
      request: {} as any,
    };
  }
}

export { ProductsService };
