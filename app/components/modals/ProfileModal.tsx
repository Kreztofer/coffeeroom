'use client';

import useProfileModal from '@/app/hooks/useProfileModal';
import { MdOutlineWork, MdLocationOn } from 'react-icons/md';
import { PiMapPinFill } from 'react-icons/pi';
import Modal from './Modal';
import Image from 'next/image';
import { SOCIALS } from '@/app/context';
import Button from '../Button';
import { FaPen } from 'react-icons/fa';
import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import { handleFriendsText } from '@/app/hooks/handleFriendsText';
import { SafeUser } from '@/app/types';

interface ProfileModalProps {
  currentUser?: SafeUser | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ currentUser }) => {
  const profileModal = useProfileModal();
  const editProfileModal = useEditProfileModal();

  const handleModal = () => {
    profileModal.onClose();
    editProfileModal.onOpen();
    document.body.style.overflowY = 'hidden';
  };

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

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-[25px]">
        {currentUser?.image ? (
          <Image
            className="rounded-full h-[100px] w-[100px]"
            height="100"
            width="100"
            alt="logo"
            src={currentUser?.image || '/images/placeholder.jpg'}
          />
        ) : (
          <Image
            className="rounded-full h-[100px] w-[100px]"
            height="100"
            width="100"
            alt="logo"
            src={currentUser?.profileImage || '/images/placeholder.jpg'}
          />
        )}

        <div>
          <p className="font-bold text-lg">{currentUser?.name}</p>
          <p className="font-extralight text-gray-400">
            {handleFriendsText(currentUser?.friends?.length)}
          </p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <div className="font-light text-base">
            {currentUser?.location ? (
              <div className="flex items-center gap-3">
                <PiMapPinFill size={24} className="text-[#10CEF7]" />
                <p>{currentUser?.location}</p>
              </div>
            ) : (
              <div
                onClick={() => handleModal()}
                className="flex items-center cursor-pointer gap-3"
              >
                <PiMapPinFill size={24} className="text-[#10CEF7]" />
                <p>Add location</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div className="font-light text-base">
            {currentUser?.occupation ? (
              <div className="flex items-center gap-3">
                {currentUser?.socialId && (
                  <>
                    {currentUser?.socialId === 1 ? (
                      <Image
                        height="100"
                        width="100"
                        className="w-[22px] h-[22px]"
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
                <p>{currentUser?.occupation}</p>
              </div>
            ) : (
              <div
                onClick={() => handleModal()}
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
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-2">
      <hr />
      <Button label="Edit Profile" icon={FaPen} onClick={() => handleModal()} />
    </div>
  );
  return (
    <Modal
      isOpen={profileModal.isOpen}
      title="Profile"
      onClose={profileModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ProfileModal;
