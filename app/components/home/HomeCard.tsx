'use client';

import MyProfile from '../feed/MyProfile';
import MainFeed from '../feed/MainFeed';
import AdsAndFriends from '../feed/AdsAndFriends';
import { Friends, SafePosts, SafeUser } from '@/app/types';

interface HomeCardProps {
  currentUser: SafeUser;
  feed?: SafePosts[] | null;
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
      {/* <MainFeed
        main={true}
        feed={feed}
        currentUser={currentUser}
        currentUserId={currentUser.id}
        toggle="yes"
      />
      <AdsAndFriends currentUserId={currentUser.id} friends={friendList} /> */}
    </div>
  );
};

export default HomeCard;
