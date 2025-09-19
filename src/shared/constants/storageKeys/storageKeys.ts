import type { TStorageKeys } from './type';

const KEY_BASE = '@CONECTAR';

export const STORAGE_KEYS: TStorageKeys = {
  MODULE: `${KEY_BASE}/MAR`,
  AUTH_TOKENS: `${KEY_BASE}/auth_tokens`,
  USER: `${KEY_BASE}/user`,
  RECOVERY_PASSWORD_DATA: `${KEY_BASE}/recovery_password_data`,
  RECOVERY_PASSWORD_UUID: `${KEY_BASE}/recovery_password_uuid`,
  MENUS: `${KEY_BASE}/menus`,
  IMAGES: `${KEY_BASE}/images`,
  MODULES: `${KEY_BASE}/modules`,
  PROVIDER: `${KEY_BASE}/provider`,
  PERMISSIONS: `${KEY_BASE}/permissions`,
  THEME: `${KEY_BASE}/theme`,
  LOGO: `${KEY_BASE}/theme`,
  HISTORY: `${KEY_BASE}/history`,
};
