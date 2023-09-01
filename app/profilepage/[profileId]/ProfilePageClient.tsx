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
        <div className="md:w-[70%] w-full md:h-[80%] h-[70%] mx-auto relative">
          <Image
            src={
              profile?.image || profile?.profileImage || '/images/backdrop.jpg'
            }
            width="300"
            height="300"
            alt="profile"
            className="object-cover rounded-b-lg h-full w-full"
          />
          <div className="bg-black top-0 left-0 h-full w-full opacity-[0.4] rounded-none lg:rounded-b-lg absolute" />
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
              className="md:h-[150px] md:w-[150px] h-[100px] w-[100px] rounded-full absolute border-2 border-white bottom-[-60px] left-5"
            />
          </div>
          <div className="flex items-center md:w-[100%] w-[90%] mx-auto  md:mt-5 mt-[65px] sm:mt-[80px] ms:mt-[110px] md:justify-end">
            <div className="flex items-center md:w-[75%] w-full justify-between">
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
      <div className="flex md:w-[70%] w-[90%] mx-auto justify-between mb-10">
        <ProfileCard currentUser={profile} />
        <div className="md:w-[60%] w-full">
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
