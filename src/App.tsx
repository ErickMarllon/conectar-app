// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// React Router
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Router
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from './routes/paths';

// Toast notifications
import { ToastContainer } from 'react-toastify';

// Layouts
import CompactLayout from './layout/compact';
import DashboardLayout from './layout/dashboard';
import MainLayout from './layout/main';
import SimpleLayout from './layout/simple';

// Views
import {
  AboutPage,
  AuthCallback,
  ComingSoonPage,
  ContactPage,
  Dashboard,
  EcommerceCheckoutPage,
  EcommerceProductCreatePage,
  EcommerceProductDetailsPage,
  EcommerceProductEditPage,
  EcommerceProductListPage,
  EcommerceShopPage,
  FaqPage,
  FileManagerPage,
  GeneralAnalyticsPage,
  GeneralBankingPage,
  GeneralBookingPage,
  GeneralEcommercePage,
  GeneralFilePage,
  Home,
  InvoiceCreatePage,
  InvoiceDetailsPage,
  InvoiceEditPage,
  InvoiceListPage,
  KanbanPage,
  LoginPage,
  MaintenancePage,
  NewPasswordPage,
  NotFound,
  Page403,
  Page404,
  Page500,
  PaymentPage,
  PricingPage,
  RegisterPage,
  ResetPasswordPage,
  UserAccountPage,
  UserCardsPage,
  UserCreatePage,
  UserEditPage,
  UserListPage,
  VerifyCodePage,
} from './views';

// (MUI ThemeProvider)
import ThemeProvider from './providers/themeProvider';

// lazy motion
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MotionLazyContainer } from './components/animate';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <MotionLazyContainer>
          <ThemeProvider>
            <ToastContainer />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <BrowserRouter>
                <Routes>
                  <Route>
                    <Route
                      path={PATH_AUTH.root}
                      element={<Navigate to={PATH_AUTH.login} replace />}
                    />
                    <Route path={PATH_AUTH.login} element={<LoginPage />} />
                    <Route path={PATH_AUTH.register} element={<RegisterPage />} />

                    <Route path={PATH_AUTH.loginSlug} element={<LoginPage />} />
                    <Route path={PATH_AUTH.registerSlug} element={<RegisterPage />} />

                    <Route path={PATH_AUTH.callbak} element={<AuthCallback />} />
                  </Route>

                  <Route element={<SimpleLayout />}>
                    <Route path={PATH_PAGE.pricing} element={<PricingPage />} />
                    <Route path={PATH_PAGE.payment} element={<PaymentPage />} />
                  </Route>

                  <Route element={<DashboardLayout />}>
                    <Route path={PATH_DASHBOARD.root} element={<Dashboard />} />
                    <Route path={PATH_DASHBOARD.general.app} element={<Dashboard />} />
                    <Route path={PATH_DASHBOARD.kanban} element={<KanbanPage />} />
                    <Route
                      path={PATH_DASHBOARD.general.ecommerce}
                      element={<GeneralEcommercePage />}
                    />
                    <Route
                      path={PATH_DASHBOARD.general.analytics}
                      element={<GeneralAnalyticsPage />}
                    />
                    <Route path={PATH_DASHBOARD.general.banking} element={<GeneralBankingPage />} />
                    <Route path={PATH_DASHBOARD.general.booking} element={<GeneralBookingPage />} />
                    <Route path={PATH_DASHBOARD.general.file} element={<GeneralFilePage />} />
                    <Route path={PATH_DASHBOARD.fileManager} element={<FileManagerPage />} />
                  </Route>

                  <Route element={<DashboardLayout />}>
                    <Route
                      path={PATH_DASHBOARD.user.root}
                      element={<Navigate to={PATH_DASHBOARD.user.account} replace />}
                    />
                    <Route path={PATH_DASHBOARD.user.list} element={<UserListPage />} />
                    <Route path={PATH_DASHBOARD.user.cards} element={<UserCardsPage />} />
                    <Route path={PATH_DASHBOARD.user.account} element={<UserAccountPage />} />
                    <Route path={PATH_DASHBOARD.user.new} element={<UserCreatePage />} />
                    <Route path={PATH_DASHBOARD.user.edit} element={<UserEditPage />} />
                  </Route>

                  <Route element={<DashboardLayout />}>
                    <Route
                      path={PATH_DASHBOARD.enterprise.root}
                      element={<Navigate to={PATH_DASHBOARD.enterprise.account} replace />}
                    />
                    <Route path={PATH_DASHBOARD.enterprise.new} element={<UserCreatePage />} />
                    <Route path={PATH_DASHBOARD.enterprise.list} element={<UserListPage />} />
                    <Route path={PATH_DASHBOARD.enterprise.cards} element={<UserCardsPage />} />
                    <Route path={PATH_DASHBOARD.enterprise.account} element={<UserAccountPage />} />
                  </Route>

                  <Route element={<DashboardLayout />}>
                    <Route path={PATH_DASHBOARD.invoice.root} element={<InvoiceListPage />} />
                    <Route path={PATH_DASHBOARD.invoice.list} element={<InvoiceListPage />} />
                    <Route path={PATH_DASHBOARD.invoice.new} element={<InvoiceCreatePage />} />
                    <Route
                      path={PATH_DASHBOARD.invoice.viewSlug}
                      element={<InvoiceDetailsPage />}
                    />
                    <Route path={PATH_DASHBOARD.invoice.editSlug} element={<InvoiceEditPage />} />
                  </Route>

                  <Route element={<DashboardLayout />}>
                    <Route path={PATH_DASHBOARD.eCommerce.root} element={<EcommerceShopPage />} />
                    <Route path={PATH_DASHBOARD.eCommerce.shop} element={<EcommerceShopPage />} />
                    <Route
                      path={PATH_DASHBOARD.eCommerce.list}
                      element={<EcommerceProductListPage />}
                    />

                    <Route
                      path={PATH_DASHBOARD.eCommerce.checkout}
                      element={<EcommerceCheckoutPage />}
                    />
                    <Route
                      path={PATH_DASHBOARD.eCommerce.new}
                      element={<EcommerceProductCreatePage />}
                    />
                    <Route
                      path={PATH_DASHBOARD.eCommerce.viewParamSlug}
                      element={<EcommerceProductDetailsPage />}
                    />
                    <Route
                      path={PATH_DASHBOARD.eCommerce.editParamSlug}
                      element={<EcommerceProductEditPage />}
                    />
                  </Route>

                  <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path={PATH_PAGE.about} element={<AboutPage />} />
                    <Route path={PATH_PAGE.faqs} element={<FaqPage />} />
                    <Route path={PATH_PAGE.contact} element={<ContactPage />} />
                  </Route>

                  <Route element={<CompactLayout />}>
                    <Route path="*" element={<Page404 />} />
                    <Route path={PATH_PAGE.page403} element={<Page403 />} />
                    <Route path={PATH_PAGE.page404} element={<Page404 />} />
                    <Route path={PATH_PAGE.page500} element={<Page500 />} />
                    <Route path={PATH_PAGE.comingSoon} element={<ComingSoonPage />} />
                    <Route path={PATH_PAGE.maintenance} element={<MaintenancePage />} />
                    <Route path={PATH_AUTH.resetPassword} element={<ResetPasswordPage />} />
                    <Route path={PATH_AUTH.verify} element={<VerifyCodePage />} />
                    <Route path={PATH_AUTH.newPassword} element={<NewPasswordPage />} />
                    <Route path="/notfound" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </LocalizationProvider>
          </ThemeProvider>
        </MotionLazyContainer>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
