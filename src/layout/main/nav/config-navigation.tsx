import { PATH_AUTH, PATH_PAGE } from '@/routes/paths';
import { PATH_AFTER_LOGIN } from '@/configs/global';
import Iconify from '@/components/iconify';

const navConfig = [
  {
    id: 'home',
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    id: 'pages',
    title: 'Pages',
    path: '/pages',
    icon: <Iconify icon="eva:file-fill" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { id: 'about', title: 'About us', path: PATH_PAGE.about },
          { id: 'contact', title: 'Contact us', path: PATH_PAGE.contact },
          { id: 'faqs', title: 'FAQs', path: PATH_PAGE.faqs },
          { id: 'pricing', title: 'Pricing', path: PATH_PAGE.pricing },
        ],
      },
      {
        subheader: 'Authentication',
        items: [
          { id: 'login', title: 'Login', path: PATH_AUTH.login },
          { id: 'register', title: 'Register', path: PATH_AUTH.register },
          { id: 'resetPassword', title: 'Reset password', path: PATH_AUTH.resetPassword },
          { id: 'verify', title: 'Verify code', path: PATH_AUTH.verify },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ id: 'dashboard', title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
];

export default navConfig;
