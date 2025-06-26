import type { IFormUserProps } from '../types';

export interface DashboardUserModalContextProps {
  modalProps?: IFormUserProps;
  openModal: (props: IFormUserProps) => void;
  closeModal: () => void;
  registerFunction: (fn: () => void) => void;
  callRegisteredFunction: () => void;
}
