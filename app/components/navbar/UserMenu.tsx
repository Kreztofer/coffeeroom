'use client';
import { SafeUser } from '@/app/types';
import Profile from './Profile';
import { FaBell } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { ImCancelCircle } from 'react-icons/im';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiLogIn, FiSettings } from 'react-icons/fi';
import { CiLogout } from 'react-icons/ci';
import { BsCheck2Circle, BsMoon, BsChatDotsFill } from 'react-icons/bs';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import useProfileModal from '@/app/hooks/useProfileModal';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [sidebar, setSidebar] = useState(false);

  const openSidebar = () => {
    setSidebar(true);
    document.body.style.overflowY = 'hidden';
  };

  const closeSidebar = () => {
    setSidebar(false);
    document.body.style.overflowY = 'auto';
  };
  const registerModal = useRegisterModal();
  const profileModal = useProfileModal();
  const loginModal = useLoginModal();
  const date = new Date();
  const year = date.getFullYear();

  const handleProfileModal = () => {
    profileModal.onOpen();
    document.body.style.overflowY = 'hidden';
  };

  return (
    <>
      <div className="hidden lg:flex text-myBlack gap-10 justify-between items-center">
        <div className="flex gap-5 items-center">
          <BsChatDotsFill className="w-[23px] text-myBlack h-[23px]" />
          <FaBell className="w-[23px] text-myBlack h-[23px]" />
        </div>
        <Profile currentUser={currentUser} />
      </div>

      <div className="flex lg:hidden">
        <RxHamburgerMenu
          onClick={() => openSidebar()}
          className="cursor-pointer relative"
          size={25}
        />
        {sidebar && (
          <div className="fixed p-3 flex flex-col top-0 shadow-lg bg-white h-[100%] w-[70%] right-0">
            <ImCancelCircle
              onClick={() => closeSidebar()}
              className="text-[#F72C10] cursor-pointer"
              size={20}
            />
            <div className="flex mt-4 w-[100%] h-full items-center">
              {currentUser ? (
                <div className="flex h-full flex-col gap-2 w-[100%]">
                  <div className="h-[95%] w-[100%]">
                    <div
                      onClick={() => handleProfileModal()}
                      className="flex w-[100%] bg-[#f7f7f7] items-center h-[80px] shadow-md px-3 gap-5"
                    >
                      <div>
                        <Image
                          className="rounded-full h-[50px] w-[50px]"
                          height="100"
                          width="100"
                          alt="logo"
                          src={
                            currentUser?.profileImage ||
                            currentUser?.image ||
                            '/images/placeholder.jpg'
                          }
                        />
                      </div>
                      <div>
                        <p className="transition cursor-pointer hover:text-myblue">
                          View Profile
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <MenuItem icon={FiSettings} label="Settings" />
                      <MenuItem
                        icon={AiOutlineQuestionCircle}
                        label="Help & Support"
                      />
                      <MenuItem icon={BsMoon} label="Display" />
                      <hr />
                      <MenuItem
                        icon={CiLogout}
                        onClick={() => signOut()}
                        label="Logout"
                      />
                    </div>
                  </div>
                  <div className="h-[5%] w-[100%]">
                    <div className="w-[100%] mx-auto mb-2">
                      <p className="text-[12px]">
                        All rights reserved{' '}
                        <a href="https://dominicua.com/" className="underline">
                          Dominicua{' '}
                        </a>
                        © {year}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full">
                  <div className="h-[95%] flex flex-col gap-2 w-full">
                    <MenuItem
                      icon={FiLogIn}
                      onClick={() => loginModal.onOpen()}
                      label="Login"
                    />
                    <MenuItem
                      onClick={() => registerModal.onOpen()}
                      label="Sign up"
                      icon={BsCheck2Circle}
                    />
                  </div>
                  <div className="h-[5%] w-full">
                    <div className="w-[100%] mx-auto mb-2">
                      <p className="text-[12px]">
                        All rights reserved{' '}
                        <a href="https://dominicua.com/" className="underline">
                          Dominicua{' '}
                        </a>
                        © {year}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
