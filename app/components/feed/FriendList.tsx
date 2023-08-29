'use client';

import useAddFriends from '@/app/hooks/useAddFriends';
import { Friends } from '@/app/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiOutlineUserDelete } from 'react-icons/ai';

interface FriendListProps {
  id: string;
  image: string;
  name: string;
  occupation: string;
  currentUserId: string;
  friends?: any;
}

const FriendList: React.FC<FriendListProps> = ({
  id,
  name,
  occupation,
  image,
  friends,
  currentUserId,
}) => {
  const router = useRouter();

  const { patch, checked } = useAddFriends({
    userId: currentUserId,
  });

  return (
    <div key={id} className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image
          src={image || '/images/placeholder.jpg'}
          width="400"
          height="100"
          className="rounded-full cursor-pointer w-[42px] h-[42px]"
          alt="banner"
          onClick={() => router.push(`/profilepage/${id}`)}
        />
        <div className="flex flex-col">
          <p
            onClick={() => router.push(`/profilepage/${id}`)}
            className="font-bold text-[12px] cursor-pointer"
          >
            {name}
          </p>
          <p className="text-[#838282] text-[10px]">{occupation}</p>
        </div>
      </div>
      <AiOutlineUserDelete
        onClick={(e: any) => patch(e, id)}
        className="cursor-pointer"
        size={20}
      />
    </div>
  );
};

export default FriendList;
