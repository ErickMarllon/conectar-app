import { LocalStorageService } from '@/services/localStorageService';
import { refreshAccessToken } from './utils/refreshAccessToken';
import axios from 'axios';
import { handleHttpErrorRedirect } from './utils/handleHttpErrorRedirect';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const { access_token } = LocalStorageService.getAuthTokens();

  config.headers = config.headers || {};

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = handleHttpErrorRedirect(error.response?.status);

    const originalConfig = error.config;
    const isUnauthorized = status === 401;

    if (isUnauthorized && originalConfig?.url !== '/auth/refresh') {
      try {
        const tokens = await refreshAccessToken();
        error.config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
        return api.request(error.config);
        // eslint-disable-next-line unused-imports/no-unused-vars
      } catch (_error) {
        LocalStorageService.cleanStorage();
        window.location.href = '/';
      }
    }
    return Promise.reject(error.response?.data || error.message);
  },
);

export { api };
