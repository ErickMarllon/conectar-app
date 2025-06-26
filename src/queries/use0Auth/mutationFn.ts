import { AuthService } from '@/services/authService';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

const mutationFn = async (code: string): Promise<AxiosResponse<IUserAuth>> => {
  return AuthService.getToken(code);
};

export { mutationFn };
