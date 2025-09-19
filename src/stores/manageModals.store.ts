import { create } from 'zustand';

export type ModalType = 'CONFIRM' | 'EDIT_USER';

interface ModalData {
  type: ModalType;
  data?: any;
}

interface ModalState {
  modals: ModalData[];
  openModal: (type: ModalType, data?: any) => void;
  closeModal: (type: string) => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (type, data) =>
    set((state) => ({
      modals: [...state.modals, { type, data }],
    })),
  closeModal: (type) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.type !== type),
    })),
  closeAll: () => set({ modals: [] }),
}));
