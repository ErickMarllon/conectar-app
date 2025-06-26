import axios, { AxiosError } from 'axios';
import { AppError } from '@/errors/appError/AppError';
import { LocalStorageService } from '@/services/localStorageService';
import { AuthService } from '@/services/authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const tokens = LocalStorageService.getAuthTokens();

  const configUpdated = config;

  if (tokens?.access_token && configUpdated.headers) {
    configUpdated.headers.Authorization = `Bearer ${tokens.access_token}`;

    if (import.meta.env.VITE_APP_URL) {
      configUpdated.headers['force-origin'] = import.meta.env.VITE_APP_URL;
    }
  }

  return configUpdated;
});

api.interceptors.response.use(
  async (success) => {
    return success;
  },
  async (error: AxiosError) => {
    const config = error.config;

    if (error.response && error.response.status === 401 && config?.url !== '/auth/refresh') {
      try {
        const tokensStorage = LocalStorageService.getAuthTokens();

        if (!tokensStorage?.refresh_token) {
          throw new AppError('Refresh Token não encontrado!');
        }

        const response = await AuthService.refreshToken(tokensStorage.refresh_token);

        LocalStorageService.setAuthTokens({
          refresh_token: response.data.refresh_token,
          access_token: response.data.access_token,
        });
        if (config) {
          return api(config);
        }
      } catch (error) {
        if (error) {
          AuthService.logout();
        }
      }
    }

    return Promise.reject(error);
  },
);

export { api };
