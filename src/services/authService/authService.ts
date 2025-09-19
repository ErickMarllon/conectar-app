import type { IUserAuth } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import type { IRefreshTokenDTO } from './dtos/IRefreshTokenDTO';
import { api } from '@/http/api';
import type { ISignIn } from '@/schemas/sign-in.schema';
import type { ISignUp } from '@/schemas/sign-up.schema';
import type { IChangePassword } from '@/schemas/change-password-schema';

class AuthService {
  public static async login({ ...body }: ISignIn): Promise<AxiosResponse<IUserAuth>> {
    return await api.post<IUserAuth>('/auth/login', body);
  }

  public static async register({ ...body }: ISignUp): Promise<AxiosResponse<IUserAuth>> {
    return await api.post<IUserAuth>('/auth/register', body);
  }

  public static async googleOAuth(redirectUrl: string, tenant?: string) {
    const url = `${import.meta.env.VITE_API_URL}/auth/google?redirect=${redirectUrl}${tenant ? `&tenant=${tenant}` : ''}`;
    window.location.href = url;
  }
  public static async metaeOAuth(redirectUrl: string, tenant?: string) {
    const url = `${import.meta.env.VITE_API_URL}/auth/meta?redirect=${redirectUrl}${tenant ? `&tenant=${tenant}` : ''}`;
    window.location.href = url;
  }

  public static async getToken(code: string): Promise<AxiosResponse<IUserAuth>> {
    return await api.get<IUserAuth>(`/auth/token/${code}`);
  }

  public static async refreshToken(
    refresh_token: string,
  ): Promise<AxiosResponse<IRefreshTokenDTO>> {
    return await api.post<IRefreshTokenDTO>(
      '/auth/refresh',
      {},
      {
        headers: {
          'x-refresh-token': refresh_token,
        },
      },
    );
  }

  public static async logout(): Promise<void> {
    await api.patch('/auth/logout');
  }

  public static async userPathPassword(data: IChangePassword): Promise<AxiosResponse<IUserAuth>> {
    const { user_id, ...formData } = data;
    return await api.patch(`/auth/change-password/${user_id}`, formData);
  }
}

export { AuthService };
