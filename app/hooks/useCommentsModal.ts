import { create } from 'zustand';

interface CommentsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  postId: string;
  onPost: (id: string) => void;
}

const useCommentsModal = create<CommentsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  postId: '',
  onPost: (id: string) => set({ postId: id }),
}));

export default useCommentsModal;
