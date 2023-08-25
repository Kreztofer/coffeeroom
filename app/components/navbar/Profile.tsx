'use client';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Avater from '../Avater';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiLogIn, FiSettings } from 'react-icons/fi';
import { CiLogout } from 'react-icons/ci';
import { BsCheck2Circle, BsMoon } from 'react-icons/bs';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import useProfileModal from '@/app/hooks/useProfileModal';

interface ProfileProps {
  currentUser?: SafeUser | null;
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const profileModal = useProfileModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleProfileModal = () => {
    profileModal.onOpen();
    document.body.style.overflowY = 'hidden';
  };

  const date = new Date();
  const year = date.getFullYear();

  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div
      onClick={() => toggleMenu()}
      className="bg-myGrey gap-[10px] rounded-[25px] flex justify-between items-center cursor-pointer px-3 py-2 relative hover:shadow-md transition"
    >
      <div className="flex gap-[10px] items-center">
        <Avater src={currentUser?.image.url} />
        <p className="text-[14px]">{currentUser?.name}</p>
      </div>
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      {isOpen && (
        <div className="absolute z-50 rounded-xl border border-t-[#eeeaea] shadow-md w-[40vw] md:w-[270px] bg-[#fff] overflow-hidden right-0 top-[50px] text-sm">
          {currentUser ? (
            <>
              <div
                onClick={() => handleProfileModal()}
                className="flex w-[100%] bg-[#f7f7f7] items-center h-[70px] shadow-md px-3 gap-4"
              >
                <div>
                  <Avater src={currentUser?.image.url} />
                </div>
                <div>
                  <p className="transition hover:text-myblue">View Profile</p>
                </div>
              </div>
              <MenuItem icon={FiSettings} label="Settings" />
              <MenuItem icon={AiOutlineQuestionCircle} label="Help & Support" />
              <MenuItem icon={BsMoon} label="Display" />
              <hr />
              <MenuItem
                icon={CiLogout}
                onClick={() => signOut()}
                label="Logout"
              />
              <div className="w-[90%] mx-auto mb-2">
                <p className="text-[12px]">
                  All rights reserved{' '}
                  <a href="https://dominicua.com/" className="underline">
                    Dominicua{' '}
                  </a>
                  © {year}
                </p>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
