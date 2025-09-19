// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '@/routes/paths';
// config
import { PATH_AFTER_LOGIN } from '@/configs/global';
// components
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

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
          { id: 'payment', title: 'Payment', path: PATH_PAGE.payment },
          { id: 'maintenance', title: 'Maintenance', path: PATH_PAGE.maintenance },
          { id: 'comingSoon', title: 'Coming Soon', path: PATH_PAGE.comingSoon },
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
        subheader: 'Error',
        items: [
          { id: 'page403', title: 'Page 403', path: PATH_PAGE.page403 },
          { id: 'page404', title: 'Page 404', path: PATH_PAGE.page404 },
          { id: 'page500', title: 'Page 500', path: PATH_PAGE.page500 },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ id: 'dashboard', title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
  {
    id: 'docs',
    title: 'Documentation',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_DOCS.root,
  },
];

export default navConfig;
