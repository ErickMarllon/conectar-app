import type { IUser } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import { api } from '@/http/api';

class UserService {
  public static async userById(id: string): Promise<AxiosResponse<IUser>> {
    return await api.get<IUser>(`users/${id}`);
  }
  public static async userPath(user: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return await api.patch<IUser>(`users/${user.id}`, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: 'newpassword123',
      role: user.role,
    });
  }
  public static async userDelete(id: string): Promise<void> {
    await api.delete<IUser>(`users/${id}`);
  }
}

export { UserService };
