// import { AUTH_ROUTES, FIRST_ROUTES } from '@/routes/paths';
// import { useAuthStore } from '@/stores/userAuth.store';
// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// export function useAuthRedirect() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, isAuthorized } = useAuthStore();

//   useEffect(() => {
//     const isVisitorOnly = AUTH_ROUTES.includes(location.pathname);

//     if (!isVisitorOnly && !user?.role && !isAuthorized(location.pathname)) {
//       navigate(FIRST_ROUTES['DEFAULT'], { replace: true });
//       return;
//     }

//     if (isVisitorOnly && user?.role && isAuthorized(location.pathname)) {
//       navigate(FIRST_ROUTES[user.role], { replace: true });
//       return;
//     }
//   }, [user, navigate, location, isAuthorized]);
// }
