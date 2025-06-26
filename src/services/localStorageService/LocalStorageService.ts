import { STORAGE_KEYS } from '@/shared/constants/storageKeys';
import type { ITokens } from '@/shared/interfaces/ITokens';
import type { IUserAuth } from '@/shared/interfaces/IUser';

class LocalStorageService {
  public static setAuthTokens(tokens: ITokens): void {
    localStorage.setItem(
      STORAGE_KEYS.AUTH_TOKENS,
      JSON.stringify({
        ...tokens,
      }),
    );
  }

  public static getAuthTokens(): ITokens {
    const tokens = localStorage.getItem(STORAGE_KEYS.AUTH_TOKENS);

    if (tokens) {
      return JSON.parse(tokens) as ITokens;
    }

    return {} as ITokens;
  }

  public static removeAuthTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKENS);
  }

  public static setUser(user: Partial<IUserAuth>): void {
    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify({
        ...user,
      }),
    );
  }

  public static getUser(): IUserAuth {
    const tokens = localStorage.getItem(STORAGE_KEYS.USER);

    if (tokens) {
      return JSON.parse(tokens) as IUserAuth;
    }

    return {} as IUserAuth;
  }

  public static removeUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  public static cleanStorage() {
    this.removeAuthTokens();
    this.removeUser();
  }
}

export { LocalStorageService };
