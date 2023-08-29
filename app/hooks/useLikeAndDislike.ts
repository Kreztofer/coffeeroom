import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/app/types';

import useLoginModal from './useLoginModal';
import { Post } from '@prisma/client';

interface IUseFavorite {
  postId: string;
  likes: any;
  currentUser?: SafeUser | null;
}

const useLikeAndDislike = ({ postId, likes, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = likes || [];

    return list.includes(currentUser?.id);
  }, [likes, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/like/${postId}`);
        } else {
          request = () => axios.post(`/api/like/${postId}`);
        }

        await request();
        router.refresh();
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, hasFavorited, postId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useLikeAndDislike;
