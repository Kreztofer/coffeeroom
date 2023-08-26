import { create } from 'zustand';

interface ProfileLoadingModalStore {
  isLoading: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProfileLoadingModal = create<ProfileLoadingModalStore>((set) => ({
  isLoading: false,
  onOpen: () => set({ isLoading: true }),
  onClose: () => set({ isLoading: false }),
}));

export default useProfileLoadingModal;
