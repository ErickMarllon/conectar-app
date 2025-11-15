import { UserRole } from '@/shared/enums';
function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
  refresh: path(ROOTS_AUTH, '/refresh'),
  token: path(ROOTS_AUTH, '/token'),
  callbak: path(ROOTS_AUTH, '/callback'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  loginSlug: path(ROOTS_AUTH, '/login/:slug?'),
  registerSlug: path(ROOTS_AUTH, '/register/:slug?'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  paymentPlan: '/payment/plan/:slug',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  paymentPlanSlug: (slug: string) => `/payment/plan/${slug?.toLowerCase()}`,
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    edit: path(ROOTS_DASHBOARD, `/user/:slug/edit`),
    account: path(ROOTS_DASHBOARD, '/user/:slug/account'),
    //
    editSlug: (slug: string) => path(ROOTS_DASHBOARD, `/user/${slug}/edit`),
    accountSlug: (slug: string) => path(ROOTS_DASHBOARD, `/user/${slug}/account`),
  },
  enterprise: {
    root: path(ROOTS_DASHBOARD, '/enterprise'),
    new: path(ROOTS_DASHBOARD, '/enterprise/new'),
    list: path(ROOTS_DASHBOARD, '/enterprise/list'),
    cards: path(ROOTS_DASHBOARD, '/enterprise/cards'),
    profile: path(ROOTS_DASHBOARD, '/enterprise/profile'),
    account: path(ROOTS_DASHBOARD, '/enterprise/account'),
    accountSlug: (slug: string) => path(ROOTS_DASHBOARD, `/enterprise/${slug}/account`),
    editSlug: (slug: string) => path(ROOTS_DASHBOARD, `/enterprise/${slug}/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    editParamSlug: path(ROOTS_DASHBOARD, `/e-commerce/product/:slug/edit`),
    viewParamSlug: path(ROOTS_DASHBOARD, `/e-commerce/product/:slug`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    viewSlug: path(ROOTS_DASHBOARD, `/invoice/:slug`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    editSlug: path(ROOTS_DASHBOARD, `/invoice/:slug/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  [PATH_DASHBOARD.general.app]: [UserRole.ADMIN],
  [PATH_DASHBOARD.user.cards]: [UserRole.OWNER, UserRole.ADMIN, UserRole.STAFF],
  [PATH_DASHBOARD.user.list]: [UserRole.OWNER, UserRole.ADMIN, UserRole.STAFF],
  [PATH_DASHBOARD.user.new]: [UserRole.OWNER, UserRole.ADMIN, UserRole.STAFF],
  [PATH_DASHBOARD.user.edit]: [UserRole.OWNER, UserRole.ADMIN, UserRole.STAFF],
  [PATH_DASHBOARD.user.account]: [UserRole.OWNER, UserRole.ADMIN, UserRole.STAFF, UserRole.USER],
  [PATH_DASHBOARD.enterprise.account]: [
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.STAFF,
    UserRole.USER,
  ],
};

export const FIRST_ROUTES_USER: Record<UserRole, string> = {
  [UserRole.ADMIN]: PATH_DASHBOARD.general.app,
  [UserRole.OWNER]: PATH_DASHBOARD.general.app,
  [UserRole.STAFF]: PATH_DASHBOARD.general.app,
  [UserRole.USER]: PATH_DASHBOARD.user.account,
};

export const PATH_FREE_VERSION = '/payment/plan/free';
export const PATH_TALK_SALES = 'https://wa.me/5521986828876?text=Ol%C3%A1!%20Quero%20saber%20mais.';

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};
