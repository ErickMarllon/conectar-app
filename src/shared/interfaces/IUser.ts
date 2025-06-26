import type { UserRole } from '../constants/enums';

export interface IUserBase {
  email: string;
  first_name: string;
  last_name?: string;
  picture?: string;
  role?: UserRole;
}

export interface IUserAuth extends IUserBase {
  access_token: string;
  refresh_token: string;
}

export interface IUser extends IUserBase {
  last_login_at: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  id: string;
}
