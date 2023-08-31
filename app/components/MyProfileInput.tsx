'use client';

import { MdModeEdit } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';
import { Dispatch, SetStateAction } from 'react';

interface MyProfileInputProps {
  setData: Dispatch<SetStateAction<string>>;
  onClick: () => void;
  id: string;
  toggle: boolean;
  value: string;
  name?: string;
  border?: boolean;
  social?: boolean;
  placeholder?: string;
}
const MyProfileInput: React.FC<MyProfileInputProps> = ({
  onClick,
  setData,
  id,
  name,
  toggle,
  value,
  border,
  social,
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
          onChange={(e: any) => setData(e.target.value)}
          disabled={toggle}
          value={value}
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

export default MyProfileInput;
