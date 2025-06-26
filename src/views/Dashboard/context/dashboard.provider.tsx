import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { DashboardUserModalContext } from './dashboard.context';
import type { IFormUserProps } from '../types';

export function DashboardUserModalProvider({ children }: { children: ReactNode }) {
  const [modalProps, setModalProps] = useState<IFormUserProps>();
  const [fn, setFn] = useState<(() => void) | null>(null);

  const registerFunction = (newFn: () => void) => {
    setFn(() => newFn);
  };

  const callRegisteredFunction = () => {
    if (fn) fn();
  };

  const openModal = useCallback((props: IFormUserProps) => {
    setModalProps(props);
  }, []);

  const closeModal = useCallback(() => {
    setModalProps(undefined);
  }, []);

  return (
    <DashboardUserModalContext.Provider
      value={{ modalProps, openModal, closeModal, registerFunction, callRegisteredFunction }}
    >
      {children}
    </DashboardUserModalContext.Provider>
  );
}
