'use client';

import Image from 'next/image';

interface AvaterProps {
  src?: string | null | undefined;
}

const Avater: React.FC<AvaterProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full h-[28px] w-[28px]"
      height="100"
      width="100"
      alt="logo"
      src={src || '/images/placeholder.jpg'}
    />
  );
};

export default Avater;
