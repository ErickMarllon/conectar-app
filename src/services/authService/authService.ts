import { apiAuth } from '@/http/apiAuth';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import type { IRefreshTokenDTO } from './dtos/IRefreshTokenDTO';
import { LocalStorageService } from '../localStorageService';
import type { ISignInDto } from '@/components/access-form/dto/sign-in.dto';
import type { ISignUpDto } from '@/components/access-form/dto/sign-up.dto';

class AuthService {
  public static async login({ email, password }: ISignInDto): Promise<AxiosResponse<IUserAuth>> {
    return await apiAuth.post<IUserAuth>('/signin', {
      email,
      password,
    });
  }

  public static async register({
    email,
    password,
    first_name,
    last_name,
  }: ISignUpDto): Promise<AxiosResponse<IUserAuth>> {
    return await apiAuth.post<IUserAuth>('/signup', {
      first_name,
      last_name,
      email,
      password,
    });
  }

  public static async googleOAuth() {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }

  public static async getToken(code: string): Promise<AxiosResponse<IUserAuth>> {
    return await apiAuth.get<IUserAuth>(`/token/${code}`);
  }

  public static async refreshToken(refreshToken: string): Promise<AxiosResponse<IRefreshTokenDTO>> {
    return await apiAuth.post<IRefreshTokenDTO>('/refresh', {
      refreshToken: refreshToken,
    });
  }

  public static logout() {
    LocalStorageService.cleanStorage();

    window.location.href = '/';
  }
}

export { AuthService };
