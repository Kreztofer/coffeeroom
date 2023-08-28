'use client';

import MyProfile from '../feed/MyProfile';
import MainFeed from '../feed/MainFeed';
import { Friends, SafeUser } from '@/app/types';
import { Post } from '@prisma/client';
import AdsAndFriends from '../feed/AdsAndFriends';

interface HomeCardProps {
  currentUser: SafeUser;
  feed?: Post[] | null;
  friendList?: Friends[] | null;
}

const HomeCard: React.FC<HomeCardProps> = ({
  currentUser,
  feed,
  friendList,
}) => {
  return (
    <div className="w-full my-10 relative flex justify-between">
      <MyProfile currentUser={currentUser} />
      <MainFeed
        feed={feed}
        main={true}
        currentUser={currentUser}
        currentUserId={currentUser.id}
        toggle="yes"
      />
      <AdsAndFriends currentUserId={currentUser.id} friends={friendList} />
    </div>
  );
};

export default HomeCard;
