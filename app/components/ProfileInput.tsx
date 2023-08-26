'use client';

import { MdModeEdit } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface ProfileInputProps {
  onClick: () => void;
  id: string;
  toggle: boolean;
  value?: string | null;
  name?: string;
  border?: boolean;
  social?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
}
const ProfileInput: React.FC<ProfileInputProps> = ({
  onClick,
  id,
  name,
  toggle,
  value,
  border,
  social,
  register,
  placeholder,
}) => {
  return (
    <div className={`${name && 'flex items-center justify-between'}`}>
      <p className="w-[15%]">{name}</p>
      <div
        className={` ${
          border ? 'border-y-[1px]' : 'border-b-[1px]'
        }  flex items-center justify-between ${
          social ? 'w-[100%]' : 'w-[80%]'
        }`}
      >
        <input
          id={id}
          disabled={toggle}
          {...register(id)}
          placeholder={placeholder}
          className=" w-full p-2 font-light bg-transparent outline-none"
        />
        <div className={`${social && 'mr-2'}`} onClick={onClick}>
          {toggle ? (
            <MdModeEdit className="cursor-pointer" />
          ) : (
            <IoMdCheckmark className="text-green-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInput;
