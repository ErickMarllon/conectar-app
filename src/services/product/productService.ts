import type { IProduct } from '@/shared/interfaces/IProduct';
import type { AxiosResponse } from 'axios';
import { api } from '@/http/api';

class ProductService {
  public static async getProduct(id: string): Promise<AxiosResponse<IProduct>> {
    return await api.get<IProduct>(`/product`, {
      params: { id },
    });
  }
}

export { ProductService };
