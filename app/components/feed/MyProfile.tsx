'use client';

import { MdOutlineWork } from 'react-icons/md';
import { PiMapPinFill } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SOCIALS } from '@/app/context';
import { handleFriendsText } from '@/app/hooks/handleFriendsText';
import { SafeUser } from '@/app/types';
import useProfileLoadingModal from '@/app/hooks/useProfileLoading';

interface MyModalProps {
  currentUser: SafeUser;
}
const MyProfile: React.FC<MyModalProps> = ({ currentUser }) => {
  const handleNavigation = (item: string) => {
    if (item === 'Twitter') {
      const firstFiveChar = currentUser?.twitter?.slice(0, 5);
      if (firstFiveChar === 'https') {
        return currentUser?.twitter;
      }
      return;
    } else if (item === 'Dribbble') {
      const firstFiveChar = currentUser?.dribbble?.slice(0, 5);

      if (firstFiveChar === 'https') {
        return currentUser?.dribbble;
      }
      return;
    } else if (item === 'Instagram') {
      const firstFiveChar = currentUser?.instagram?.slice(0, 5);

      if (firstFiveChar === 'https') {
        return currentUser?.instagram;
      }
      return;
    } else {
      const firstFiveChar = currentUser?.linkedin?.slice(0, 5);

      if (firstFiveChar === 'https') {
        return currentUser?.linkedin;
      }
      return;
    }
  };
  const router = useRouter();
  const profileLoading = useProfileLoadingModal();

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="lg:block w-[23%] hidden">
      <div className="flex rounded-lg bg-white shadow-md h-auto m-auto flex-col gap-4 p-4">
        <div className="flex items-center gap-[10px]">
          {profileLoading.isLoading ? (
            <p className="loader2" />
          ) : (
            <Image
              className="rounded-full h-[60px] w-[60px]"
              height="100"
              width="100"
              alt="logo"
              src={
                currentUser.image ||
                currentUser.profileImage ||
                '/images/placeholder.jpg'
              }
            />
          )}

          <div>
            <p className="font-extrabold text-sm">{currentUser?.name}</p>
            <p className="font-extralight text-sm text-gray-400">
              {handleFriendsText(currentUser?.friends.length)}
            </p>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="font-light text-base">
              {currentUser?.location ? (
                <div className="flex items-center gap-2">
                  <PiMapPinFill size={20} className="text-[#10CEF7]" />
                  <p className="text-sm">{currentUser?.location}</p>
                </div>
              ) : (
                <div
                  onClick={() => ''}
                  className="flex items-center cursor-pointer gap-3"
                >
                  <PiMapPinFill size={20} className="text-[#10CEF7]" />
                  <p className="text-sm">Add location</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-light text-sm">
              {currentUser?.occupation ? (
                <div className="flex items-center gap-3">
                  {currentUser?.socialId ? (
                    <>
                      {currentUser?.socialId && (
                        <>
                          {currentUser?.socialId === 1 ? (
                            <Image
                              height="100"
                              width="100"
                              className="w-[18px] h-[18px]"
                              src="/images/chef.png"
                              alt="chef"
                            />
                          ) : currentUser?.socialId === 2 ? (
                            <Image
                              height="100"
                              width="100"
                              className="w-[22px] h-[22px]"
                              src="/images/doctor.png"
                              alt="doctor"
                            />
                          ) : currentUser?.socialId === 3 ? (
                            <Image
                              height="100"
                              width="100"
                              className="w-[22px] h-[22px]"
                              src="/images/helmet.png"
                              alt="helemet"
                            />
                          ) : currentUser?.socialId === 4 ? (
                            <Image
                              height="100"
                              width="100"
                              className="w-[22px] h-[22px]"
                              src="/images/computer.png"
                              alt="computer"
                            />
                          ) : currentUser?.socialId === 5 ? (
                            <Image
                              height="100"
                              width="100"
                              className="w-[22px] h-[22px]"
                              src="/images/ball.png"
                              alt=""
                            />
                          ) : currentUser?.socialId === 6 ? (
                            <Image
                              height="100"
                              width="100"
                              className="w-[22px] h-[22px]"
                              src="/images/student.png"
                              alt=""
                            />
                          ) : (
                            <Image
                              height="100"
                              width="100"
                              className="w-[22px] h-[22px]"
                              src="/images/person.png"
                              alt=""
                            />
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <MdOutlineWork size={22} className="text-[#F72C10]" />
                  )}

                  <p>{currentUser?.occupation}</p>
                </div>
              ) : (
                <div
                  onClick={() => ''}
                  className="flex items-center cursor-pointer gap-3"
                >
                  <MdOutlineWork size={22} className="text-[#F72C10]" />
                  <p>Add occupation</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-3">
          <div className="flex items-center w-[70%] justify-between text-[14px] font-semibold text-gray-600 cursor-pointer hover:text-myblue">
            <p onClick={() => router.push(`/profilepage/${currentUser?.id}`)}>
              View activity
            </p>
          </div>
          <div className="flex items-center w-[70%] justify-between text-[14px] text-gray-400">
            <p>Profile views</p>
            <p>{currentUser?.viewedProfile}</p>
          </div>
          <div className="flex items-center w-[70%] justify-between text-[14px] text-gray-400">
            <p>Post impressions</p>
            <p>{currentUser?.impressions}</p>
          </div>
        </div>
        <hr />
        <div>
          <h3 className="font-bold">Social Profiles</h3>
          <div className="flex flex-col gap-1 mt-2">
            {SOCIALS.map((item) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                // @ts-ignore comment
                href={handleNavigation(item.name)}
                className="flex px-2 py-4 cursor-pointer hover:bg-gray-100 hover:rounded-md items-center"
                key={item.id}
              >
                <div className="flex items-center gap-2">
                  <Image
                    className="w-[24px] h-[24px] mb-1"
                    height="100"
                    width="100"
                    src={item.img}
                    alt={item.name}
                  />
                  <div>
                    <h5 className="font-semibold text-[12px]">{item.name}</h5>
                    <p className="text-[10px]">{item.type}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="flex mt-4 w-full justify-between">
          <p className="underline text-[12px] text-gray-400">Privacy Terms</p>
          <p className="underline text-[12px] text-gray-400">Advertising</p>
          <p className="underline text-[12px] text-gray-400">Cookies</p>
        </div>
        <p className="mt-3 text-[12px] text-gray-400"> Dominicua © {year}</p>
      </div>
    </div>
  );
};

export default MyProfile;
