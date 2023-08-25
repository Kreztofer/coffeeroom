import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface UseAddFriendsProp {
  userId: string;
  friendId?: string;
  friends?: any;
}

const useAddFriends = ({ userId, friends, friendId }: UseAddFriendsProp) => {
  const router = useRouter();
  const check = friends?.includes(friendId);
  const [checking, setChecking] = useState<boolean>(check);
  const [checked, setChecked] = useState<boolean | undefined>(checking);

  useEffect(() => {
    const check = friends?.includes(friendId);
    setChecking(check);
  }, [friends, friendId]);

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
          setChecked((prev) => !prev);
          router.refresh();
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  );

  return { patch, setChecked, checked, checking };
};

export default useAddFriends;
