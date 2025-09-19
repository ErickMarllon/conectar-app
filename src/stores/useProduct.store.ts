import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import type { IProductState, ProductStore } from '@/shared/interfaces/IProduct';
import { cookieStorage } from '@/services/cookies';

const initialState: IProductState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
    totalItems: 0,
  },
};

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        startLoading: () => set({ isLoading: true }),
        hasError: (error) => set({ isLoading: false, error }),
        getProductsSuccess: (products) => set({ isLoading: false, products }),
        getProductSuccess: (product) => set({ isLoading: false, product }),
        getCart: (cart) => {
          const totalItems = sum(cart.map((p) => p.quantity));
          const subtotal = sum(cart.map((p) => p.price * p.quantity));

          set((state) => ({
            checkout: {
              ...state.checkout,
              cart,
              subtotal,
              discount: state.checkout.discount || 0,
              shipping: state.checkout.shipping || 0,
              billing: state.checkout.billing || null,
              total: subtotal - (state.checkout.discount || 0),
              totalItems,
            },
          }));
        },

        addToCart: (newProduct) =>
          set((state) => {
            let updatedCart = state.checkout.cart.length
              ? state.checkout.cart.map((product) =>
                  product.id === newProduct.id && newProduct?.colors
                    ? {
                        ...product,
                        colors: uniq([...product.colors, ...newProduct.colors]),
                        quantity: product.quantity + 1,
                      }
                    : product,
                )
              : [newProduct];

            updatedCart = uniqBy([...updatedCart, newProduct], 'id');

            const totalItems = sum(updatedCart.map((p) => p.quantity));
            const subtotal = sum(updatedCart.map((p) => p.price * p.quantity));

            return { checkout: { ...state.checkout, cart: updatedCart, subtotal, totalItems } };
          }),

        deleteCart: (id) =>
          set((state) => ({
            checkout: {
              ...state.checkout,
              cart: state.checkout.cart.filter((p) => p.id !== id),
            },
          })),

        resetCart: () =>
          set(() => ({
            checkout: initialState.checkout,
          })),

        nextStep: () =>
          set((state) => ({
            checkout: { ...state.checkout, activeStep: state.checkout.activeStep + 1 },
          })),
        backStep: () =>
          set((state) => ({
            checkout: { ...state.checkout, activeStep: state.checkout.activeStep - 1 },
          })),
        gotoStep: (step) =>
          set((state) => ({
            checkout: { ...state.checkout, activeStep: step },
          })),

        increaseQuantity: (id) =>
          set((state) => ({
            checkout: {
              ...state.checkout,
              cart: state.checkout.cart.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p,
              ),
            },
          })),

        decreaseQuantity: (id) =>
          set((state) => ({
            checkout: {
              ...state.checkout,
              cart: state.checkout.cart.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity - 1 } : p,
              ),
            },
          })),

        createBilling: (billing) => set((state) => ({ checkout: { ...state.checkout, billing } })),

        applyDiscount: (discount) =>
          set((state) => {
            const subtotal = state.checkout.subtotal ?? 0;
            return {
              checkout: {
                ...state.checkout,
                discount,
                total: subtotal - discount,
              },
            };
          }),

        applyShipping: (shipping) =>
          set((state) => {
            const subtotal = state.checkout.subtotal ?? 0;
            const discount = state.checkout.discount ?? 0;
            return {
              checkout: {
                ...state.checkout,
                shipping,
                total: subtotal - discount + shipping,
              },
            };
          }),
      }),
      {
        name: 'product-store',
        storage: cookieStorage,
      },
    ),
  ),
);
