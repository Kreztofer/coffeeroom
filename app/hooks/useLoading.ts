import { create } from 'zustand';

interface LoadingModalStore {
  isLoading: boolean;
  postLoading: boolean;
  onOpen: () => void;
  onClose: () => void;
  postOpen: () => void;
  postClose: () => void;
}

const useLoadingModal = create<LoadingModalStore>((set) => ({
  isLoading: false,
  postLoading: false,
  onOpen: () => set({ isLoading: true }),
  onClose: () => set({ isLoading: false }),
  postOpen: () => set({ postLoading: true }),
  postClose: () => set({ postLoading: false }),
}));

export default useLoadingModal;
