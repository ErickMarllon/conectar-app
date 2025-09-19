import { useEffect } from 'react';
// react router dom
import { useNavigate } from 'react-router-dom';

// @mui
import { Grid, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// @types
import type { ICheckoutBillingAddress } from '@/shared/interfaces/IProduct';
// components
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
// sections
import { useThemesStore } from '@/stores/themes.store';
import {
  CheckoutBillingAddress,
  CheckoutCart,
  CheckoutOrderComplete,
  CheckoutPayment,
  CheckoutSteps,
} from './components';
import { useProductStore } from '@/stores/useProduct.store';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function EcommerceCheckoutPage() {
  const navigate = useNavigate();
  const {
    resetCart,
    getCart,
    nextStep,
    backStep,
    gotoStep,
    deleteCart,
    createBilling,
    applyShipping,
    applyDiscount,
    increaseQuantity,
    decreaseQuantity,
    checkout,
  } = useProductStore();
  const { themeStretch } = useThemesStore();
  const { cart, billing, activeStep } = checkout;
  const completed = activeStep === STEPS.length;

  useEffect(() => {
    getCart(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    if (activeStep === 1) {
      createBilling(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const handleNextStep = () => {
    nextStep();
  };

  const handleBackStep = () => {
    backStep();
  };

  const handleGotoStep = (step: number) => {
    gotoStep(step);
  };

  const handleApplyDiscount = (value: number) => {
    if (cart.length) {
      applyDiscount(value);
    }
  };

  const handleDeleteCart = (productId: string) => {
    deleteCart(productId);
  };

  const handleIncreaseQuantity = (productId: string) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId: string) => {
    decreaseQuantity(productId);
  };

  const handleCreateBilling = (address: ICheckoutBillingAddress) => {
    createBilling(address);
    nextStep();
  };

  const handleApplyShipping = (value: number) => {
    applyShipping(value);
  };

  const handleReset = () => {
    if (completed) {
      resetCart();
      navigate(PATH_DASHBOARD.eCommerce.shop, { replace: true });
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Checkout"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'E-Commerce',
            href: PATH_DASHBOARD.eCommerce.root,
          },
          { name: 'Checkout' },
        ]}
      />

      <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutSteps activeStep={activeStep} steps={STEPS} />
        </Grid>
      </Grid>

      {completed ? (
        <CheckoutOrderComplete open={completed} onReset={handleReset} onDownloadPDF={() => {}} />
      ) : (
        <>
          {activeStep === 0 && (
            <CheckoutCart
              checkout={checkout}
              onNextStep={handleNextStep}
              onDeleteCart={handleDeleteCart}
              onApplyDiscount={handleApplyDiscount}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
            />
          )}
          {activeStep === 1 && (
            <CheckoutBillingAddress
              checkout={checkout}
              onBackStep={handleBackStep}
              onCreateBilling={handleCreateBilling}
            />
          )}
          {activeStep === 2 && billing && (
            <CheckoutPayment
              checkout={checkout}
              onNextStep={handleNextStep}
              onBackStep={handleBackStep}
              onGotoStep={handleGotoStep}
              onApplyShipping={handleApplyShipping}
              onReset={handleReset}
            />
          )}
        </>
      )}
    </Container>
  );
}
