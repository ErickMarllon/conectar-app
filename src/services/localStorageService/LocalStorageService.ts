import type { ITheme } from '@/shared/interfaces/ITheme';
import type { ITokens } from '@/shared/interfaces/ITokens';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import { STORAGE_KEYS } from '@/shared/constants/storageKeys';

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
    const tokensState = localStorage.getItem(STORAGE_KEYS.USER);

    const tokens = tokensState ? JSON.parse(tokensState) : {};
    return tokens as IUserAuth;
  }

  public static removeUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  public static setTheme({ mode, theme }: ITheme): void {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify({ mode, theme }));
  }

  public static getTheme(): ITheme {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);

    if (theme) {
      return JSON.parse(theme);
    }

    return {} as ITheme;
  }

  public static removeTheme(): void {
    localStorage.removeItem(STORAGE_KEYS.THEME);
  }

  public static setHistory(value: string): void {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(value));
  }

  public static getHistory(): string | undefined {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);

    if (history) {
      return JSON.parse(history);
    }
  }

  public static removeHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  }

  public static cleanStorage() {
    this.removeAuthTokens();
    this.removeUser();
  }
}

export { LocalStorageService };
