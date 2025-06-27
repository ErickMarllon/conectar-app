import { UserRole } from '@/shared/constants/enums';

export const protectedRoutes: Record<string, UserRole[]> = {
  '/dashboard': [UserRole.ADMIN],
  '/profile': [UserRole.USER, UserRole.ADMIN],
};
