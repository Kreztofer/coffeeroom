'use client';

import { IconType } from 'react-icons';

interface MenuItemProps {
  onClick?: () => void;
  icon?: IconType;

  label: string;
}
const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon: Icon }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-[rgba(242,242,242,0.8)] transition font-semibold flex gap-5 items-center"
    >
      {Icon && <Icon size={18} />}
      {label}
    </div>
  );
};

export default MenuItem;
