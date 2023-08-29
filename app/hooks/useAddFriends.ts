import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface UseAddFriendsProp {
  userId: string;
  friendId?: string;
  friends?: any;
}

const useAddFriends = ({ userId, friends, friendId }: UseAddFriendsProp) => {
  const router = useRouter();

  const checked = useMemo(() => {
    const list = friends || [];

    return list.includes(friendId);
  }, [friendId, friends]);

  const patch = useCallback(
    async (
      e: React.MouseEvent<HTMLDivElement>,
      friendId: string | undefined
    ) => {
      e.stopPropagation();
      const data = {
        userId: userId,
        friendId: friendId,
      };
      await axios
        .patch('/api/addremovefriend', data)
        .catch((error: any) => {
          if (error.response) {
            toast.error(error.response.data.message);
          }
        })
        .finally(() => {
          router.refresh();
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  );

  return { patch, checked };
};

export default useAddFriends;
