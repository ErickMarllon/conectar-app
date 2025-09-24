import type { IUserAccountGeneral, IUserProfile, IUserSocialLink } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import { api } from '@/http/api';
import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';
import type { IUserSchema } from '@/schemas/user-schema';
import type { IUserSocialSchema } from '@/schemas/social-schema';

class UserService {
  public static async userById(id: string): Promise<AxiosResponse<IUserAccountGeneral>> {
    return await api.get(`user/${id}`);
  }

  public static async userDelete(id: string | string[]): Promise<AxiosResponse<void>> {
    return await api.delete(`user`, {
      params: {
        id,
      },
    });
  }

  public static async getUserProfile(id?: string): Promise<AxiosResponse<IUserProfile>> {
    return await api.get(`user/profile${id ? `/${id}` : ''}`);
  }

  public static async create(
    user: Partial<IUserSchema>,
  ): Promise<AxiosResponse<IUserAccountGeneral>> {
    return await api.post(`user`, user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public static async userPath(
    user: Partial<IUserSchema>,
  ): Promise<AxiosResponse<IUserAccountGeneral>> {
    const { id, ...body } = user;
    return await api.patch(`user/${id}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public static async userPathStatus(id: string): Promise<AxiosResponse<IUserAccountGeneral>> {
    return await api.patch(`user/${id}/status`);
  }

  // USER ADDRESS
  public static async newAddress(
    data: Partial<IAddressPayloadSchema>,
  ): Promise<AxiosResponse<IUserAccountGeneral>> {
    const { user_id, address } = data;

    return await api.post(`user/address/${user_id}`, address);
  }

  public static async patchAddress(
    data: Partial<IAddressPayloadSchema>,
  ): Promise<AxiosResponse<IUserAccountGeneral>> {
    const { user_id, address } = data;
    return await api.patch(`user/${user_id}/address`, address);
  }

  public static async deleteAddress(user_id: string): Promise<AxiosResponse<void>> {
    return await api.delete(`user/${user_id}/address`);
  }

  // USER SOCIAL
  public static async socialByUserId(id: string): Promise<AxiosResponse<IUserSocialLink>> {
    return await api.get(`user/${id}/social`);
  }

  public static async socialPathByUserId(
    user: Partial<IUserSocialSchema>,
  ): Promise<AxiosResponse<IUserSocialLink>> {
    const { user_id, ...data } = user;
    return await api.patch(`user/${user_id}/social`, data);
  }
}

export { UserService };
