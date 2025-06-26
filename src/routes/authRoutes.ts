import { UserRole } from '@/shared/constants/enums';

export const protectedRoutes: Record<string, UserRole[]> = {
  '/dashboard': [UserRole.ADMIN],
  '/profile': [UserRole.USER],
  '/profile2': [UserRole.USER],
  '/profile3': [UserRole.USER, UserRole.ADMIN],
};
