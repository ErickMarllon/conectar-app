import { PATH_PAGE } from '@/routes/paths';

export const handleHttpErrorRedirect = (status: number) => {
  switch (status) {
    case 403:
      window.location.href = PATH_PAGE.page403;
      break;
    // case 404:
    //   window.location.href = PATH_PAGE.page404;
    //   break;
    // case 500:
    //   window.location.href = PATH_PAGE.page500;
    // break;
    default:
      return status;
  }
};
