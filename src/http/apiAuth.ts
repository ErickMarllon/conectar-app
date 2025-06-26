import axios, { AxiosError } from 'axios';

import type { ITokens } from '@/shared/interfaces/ITokens';
import { LocalStorageService } from '@/services/localStorageService';
import type { IUserBase } from '@/shared/interfaces/IUser';

const apiAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});

apiAuth.interceptors.request.use((config) => {
  const tokens = LocalStorageService.getAuthTokens();
  const configUpdated = config;

  if (tokens?.access_token && configUpdated.headers) {
    configUpdated.headers.Authorization = `Bearer ${tokens.access_token}`;
  }

  return configUpdated;
});

apiAuth.interceptors.response.use(
  (success) => {
    const { config, data } = success;

    const isAuth =
      config.url?.includes('/') ||
      config.url?.includes('/signup') ||
      config.url?.includes('/token');

    if (isAuth) {
      const tokens: ITokens = {
        access_token: data?.access_token,
        refresh_token: data?.refresh_token,
      };
      const userDetails: IUserBase = {
        email: data?.email,
        first_name: data?.first_name,
        last_name: data?.last_name,
        picture: data?.picture,
        role: data?.role,
      };

      LocalStorageService.setAuthTokens(tokens);
      LocalStorageService.setUser(userDetails);
    }

    return success;
  },
  async (error: AxiosError) => {
    return Promise.reject(error.response?.data || error.message);
  },
);

export { apiAuth };
