import type { ITokens } from '@/shared/interfaces/ITokens';
import { AuthService } from '@/services/authService';
import { LocalStorageService } from '@/services/localStorageService';

export const refreshAccessToken = async (): Promise<ITokens> => {
  let tokens = LocalStorageService.getAuthTokens();

  if (!tokens.refresh_token || !tokens.access_token) {
    throw new Error('Token não encontrado!');
  }

  const { data } = await AuthService.refreshToken(tokens.refresh_token);
  if (!data?.access_token || !data?.refresh_token) {
    throw new Error('Tokens inválidos retornados do servidor!');
  }

  tokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };

  LocalStorageService.setAuthTokens(tokens);

  return tokens;
};
