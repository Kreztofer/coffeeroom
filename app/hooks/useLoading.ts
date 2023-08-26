import { create } from 'zustand';

interface LoadingModalStore {
  isLoading: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoadingModal = create<LoadingModalStore>((set) => ({
  isLoading: false,
  onOpen: () => set({ isLoading: true }),
  onClose: () => set({ isLoading: false }),
}));

export default useLoadingModal;
