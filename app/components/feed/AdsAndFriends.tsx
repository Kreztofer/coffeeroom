'use client';

import Image from 'next/image';
import FriendList from './FriendList';
import { Friends } from '@/app/types';

interface AdsandFrinedsProps {
  friends?: Friends[] | null;
  currentUserId: string;
}

const AdsAndFriends: React.FC<AdsandFrinedsProps> = ({
  friends,
  currentUserId,
}) => {
  return (
    <div className="w-[23%] flex flex-col gap-8 ">
      <div className="rounded-md w-full bg-white shadow-md">
        <div className="w-[90%] flex flex-col gap-3 mx-auto my-3">
          <p className="font-bold text-[14px]">Sponsored</p>
          <Image
            src={'/images/banner.png'}
            width="400"
            height="100"
            className="rounded-lg"
            alt="banner"
          />
          <div className="flex font-bold justify-between text-[#838282] text-[12px]">
            <p>Mikewatches</p>
            <p>mikewatches.com</p>
          </div>
          <p className="text-[#838282] text-[12px]">
            Your pathway to having class and prestige with some of the best
            watches in the world.
          </p>
        </div>
      </div>
      {/* <div className="rounded-md w-full bg-white shadow-md">
        <div className="w-[90%] flex flex-col gap-5 mx-auto my-4">
          <p className="font-bold text-[14px]">Friend List</p>

          {friends?.length !== 0 ? (
            <>
              {friends?.map((friend: any) => (
                <FriendList
                  key={friend._id}
                  image={friend.image}
                  name={friend.name}
                  occupation={friend.occupation}
                  id={friend._id}
                  currentUserId={currentUserId}
                  friends={friends}
                />
              ))}
            </>
          ) : (
            <div>
              <p className="italic text-gray-500 text-[12px]"> No friends</p>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default AdsAndFriends;
