'use client';

import Profile from './Profile';
import { BsChatDotsFill } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';

interface UserMenuProps {}

const UserMenu: React.FC<UserMenuProps> = () => {
  return (
    <div className="flex text-myBlack gap-10 justify-between items-center">
      <div className="flex gap-5 items-center">
        <BsChatDotsFill className="w-[23px] text-myBlack h-[23px]" />
        <FaBell className="w-[23px] text-myBlack h-[23px]" />
      </div>
      <Profile />
    </div>
  );
};

export default UserMenu;
