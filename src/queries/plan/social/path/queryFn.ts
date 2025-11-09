import type { IUserSocialSchema } from '@/schemas/social-schema';
import { UserService } from '@/services/user';
import type { IUserSocialLink } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

export const queryFn = async (
  data: Partial<IUserSocialSchema>,
): Promise<AxiosResponse<IUserSocialLink>> => {
  return UserService.socialPathByUserId(data);
};
