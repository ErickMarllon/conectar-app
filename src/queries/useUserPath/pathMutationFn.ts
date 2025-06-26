import { UserService } from '@/services/user';
import type { IUser } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

const pathMutationFn = async (user?: Partial<IUser>): Promise<AxiosResponse<IUser>> => {
  return UserService.userPath(user!);
};

export { pathMutationFn };
