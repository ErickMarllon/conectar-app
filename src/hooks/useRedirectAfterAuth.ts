// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserRole } from '@/shared/enums';
// import type { IUserBase } from '@/shared/interfaces/IUser';

// export function useRedirectAfterLogin(user?: IUserBase) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;

//     if (user?.role === UserRole.ADMIN) {
//       navigate('/dashboard', { replace: true });
//     } else if (user?.role === UserRole.USER) {
//       navigate('/profile', { replace: true });
//     }
//   }, [user, navigate]);
// }
