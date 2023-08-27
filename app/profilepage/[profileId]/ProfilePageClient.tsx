'use client';

import Image from 'next/image';
import ProfileCard from './ProfileCard';
import MainFeed from '@/app/components/feed/MainFeed';
import { handleFriendsText } from '@/app/hooks/handleFriendsText';
import useAddFriends from '@/app/hooks/useAddFriends';
import { SafeUser } from '@/app/types';
import { Post } from '@prisma/client';
interface ProfilePageClientProps {
  profile: SafeUser | null;
  posts?: Post[] | null;
  currentUserId: string;
}

const ProfilePageClient: React.FC<ProfilePageClientProps> = ({
  profile,
  posts,
  currentUserId,
}) => {
  const { patch, checked } = useAddFriends({
    userId: currentUserId,
    friendId: currentUserId,
    friends: profile?.friends,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="h-[70vh] w-full bg-[#f2f5f2] shadow-md">
        <div className="w-[70%] h-[80%] mx-auto relative">
          <Image
            src={
              profile?.image || profile?.profileImage || '/images/backdrop.jpg'
            }
            width="300"
            height="300"
            alt="profile"
            className="object-cover rounded-b-lg h-full w-full"
          />
          <div className="bg-black top-0 left-0 h-full w-full opacity-[0.4] rounded-b-lg absolute" />
          <div>
            <Image
              src={
                profile?.image ||
                profile?.profileImage ||
                '/images/placeholder.jpg'
              }
              alt="profile"
              width="300"
              height="300"
              className="h-[150px] w-[150px] rounded-full absolute border-2 border-white bottom-[-60px] left-5"
            />
          </div>
          <div className="flex items-center w-[100%] mt-5 justify-end">
            <div className="flex items-center w-[80%] justify-between">
              <div>
                <h2 className="text-xl font-bold">{profile?.name}</h2>
                {handleFriendsText(profile?.friends.length)}
              </div>

              <div onClick={(e) => patch(e, profile?.id)}>
                <button className="bg-myblue hover:scale-[1.05] duration-100 rounded-md text-white px-4 py-2">
                  {checked ? <> Remove Friend</> : <>Add friend</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[70%] mx-auto justify-between mb-10">
        <ProfileCard currentUser={profile} />
        <div className="w-[60%]">
          <div className="w-full bg-white mb-4 rounded-md shadow-md items-center flex px-4 py-3">
            <h2 className="font-semibold">Posts</h2>
          </div>
          <MainFeed
            feed={posts}
            currentUser={profile}
            currentUserId={currentUserId}
            main={false}
            toggle="none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageClient;
